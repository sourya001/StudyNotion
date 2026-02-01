/**
 * Send email via Resend API (works on Render; no SMTP needed).
 * Keeps same signature as before: mailSender(email, title, body)
 */

const RESEND_API_URL = "https://api.resend.com/emails"

const mailSender = async (email, title, body) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing in .env")
    return null
  }

  const from = process.env.MAIL_FROM || "StudyNotion <onboarding@resend.dev>"

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: title,
        html: body,
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      console.error("Resend API error:", data.message || res.statusText, data)
      return data.message || res.statusText
    }

    console.log("Mail sent:", data.id)
    return { messageId: data.id, response: data.id }
  } catch (error) {
    console.error("Resend error:", error.message)
    if (error.code) console.error("Error code:", error.code)
    return error.message
  }
}

module.exports = mailSender
