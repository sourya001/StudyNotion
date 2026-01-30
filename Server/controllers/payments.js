const { stripe } = require("../config/stripe")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Create Stripe Checkout Session and return checkout URL
exports.capturePayment = async (req, res) => {
  const { courses, success_url, cancel_url } = req.body
  const userId = req.user.id

  if (!stripe) {
    return res
      .status(500)
      .json({ success: false, message: "Stripe is not configured." })
  }

  if (!courses || courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      course = await Course.findById(course_id)

      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // Stripe expects amount in smallest currency unit (paise for INR)
  const amountInPaise = Math.round(total_amount * 100)

  if (amountInPaise <= 0) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid amount." })
  }

  const defaultSuccessUrl =
    process.env.FRONTEND_URL || "http://localhost:3000"
  const defaultCancelUrl =
    process.env.FRONTEND_URL || "http://localhost:3000"

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: amountInPaise,
            product_data: {
              name: "StudyNotion Course Purchase",
              description: `${courses.length} course(s)`,
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        success_url ||
        `${defaultSuccessUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${defaultCancelUrl}/dashboard/cart`,
      metadata: {
        userId: userId,
        courses: JSON.stringify(courses),
      },
    })

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.log("Stripe checkout error:", error)
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Could not create checkout session.",
      })
  }
}

// Verify Stripe Checkout Session and enroll student
exports.verifyPayment = async (req, res) => {
  const { session_id } = req.body
  const userId = req.user.id

  if (!stripe) {
    return res
      .status(500)
      .json({ success: false, message: "Stripe is not configured." })
  }

  if (!session_id || !userId) {
    return res.status(400).json({ success: false, message: "Payment Failed" })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    })

    if (session.payment_status !== "paid") {
      return res
        .status(200)
        .json({ success: false, message: "Payment not completed." })
    }

    const metadataUserId = session.metadata?.userId
    if (metadataUserId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized." })
    }

    let courses = []
    try {
      courses = JSON.parse(session.metadata?.courses || "[]")
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid session data." })
    }

    if (courses.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No courses in session." })
    }

    await enrollStudents(courses, userId, res)

    // Send payment success email
    const user = await User.findById(userId)
    const amount = session.amount_total || 0
    const orderId = session.id
    const paymentId =
      session.payment_intent?.id || session.payment_intent || session.id

    if (user?.email) {
      try {
        await mailSender(
          user.email,
          "Payment Received",
          paymentSuccessEmail(
            `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Student",
            amount / 100,
            orderId,
            paymentId
          )
        )
      } catch (emailErr) {
        console.log("Payment success email error:", emailErr)
      }
    }

    return res.status(200).json({ success: true, message: "Payment Verified" })
  } catch (error) {
    console.log("Verify payment error:", error)
    return res
      .status(500)
      .json({ success: false, message: error.message || "Payment verification failed." })
  }
}

// Send Payment Success Email (kept for API compatibility; also used internally)
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body
  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
    return res.status(200).json({ success: true, message: "Email sent" })
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// Enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(500).json({ success: false, error: "Course not found" })
      }
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnroled.some((id) => id.toString() === uid.toString())) {
        continue
      }

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse?.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}
