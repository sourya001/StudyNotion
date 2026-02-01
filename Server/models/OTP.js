const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Pre-save hook: send email in background so API can respond immediately (avoids timeout on Render)
OTPSchema.pre("save", function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created (fire-and-forget; don't block response)
	if (this.isNew) {
		sendVerificationEmail(this.email, this.otp).catch((err) =>
			console.error("Error sending verification email:", err)
		);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
