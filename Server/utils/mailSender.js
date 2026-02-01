/**
 * Send email via Nodemailer + Resend SMTP.
 * Same signature: mailSender(email, title, body)
 */

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing in .env");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: apiKey,
    },
  });

  const from = process.env.MAIL_FROM || "StudyNotion <onboarding@resend.dev>";

  try {
    const info = await transporter.sendMail({
      from,
      to: email.trim(),
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info.messageId);
    return { messageId: info.messageId, response: info.messageId };
  } catch (error) {
    console.error("Nodemailer/Resend error:", error.message);
    if (error.response) console.error("Response:", error.response);
    return error.message;
  }
};

module.exports = mailSender;
