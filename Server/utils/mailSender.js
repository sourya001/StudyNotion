const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error("MAIL_USER or MAIL_PASS is missing in .env")
    return null
  }

  try {
    const isGmail = (process.env.MAIL_HOST || "").includes("gmail.com")
    const transporterOptions = {
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    }
    if (isGmail) {
      transporterOptions.service = "gmail"
    } else {
      transporterOptions.host = process.env.MAIL_HOST
      transporterOptions.port = 587
      transporterOptions.secure = false
      transporterOptions.requireTLS = true
    }

    const transporter = nodemailer.createTransport(transporterOptions)

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    console.log("Mail sent:", info.messageId, info.response)
    return info
  } catch (error) {
    console.error("Nodemailer error:", error.message)
    if (error.code) console.error("Error code:", error.code)
    if (error.response) console.error("SMTP response:", error.response)
    return error.message
  }
}

module.exports = mailSender
