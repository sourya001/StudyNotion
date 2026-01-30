const Contact = require("../models/Contact")
const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  try {
    // Save contact form submission to MongoDB (admin's database)
    await Contact.create({
      email,
      firstname,
      lastname,
      message,
      phoneNo: phoneNo || "",
      countrycode: countrycode || "",
    })

    // Send confirmation email to the submitter (their message was shared/received)
    const emailRes = await mailSender(
      email,
      "We've received your message",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Contact saved to DB. Email Res ", emailRes)

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
