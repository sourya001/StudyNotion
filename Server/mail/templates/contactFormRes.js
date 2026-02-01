exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  const fullName = [firstname, lastname].filter(Boolean).join(' ') || 'there';
  const phoneDisplay = countrycode ? `${countrycode} ${phoneNo}` : phoneNo;
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We got your message – StudyNotion</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #1f2937; }
    .wrapper { padding: 24px 16px; max-width: 520px; margin: 0 auto; }
    .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden; }
    .brand-bar { height: 4px; background: linear-gradient(90deg, #FFD60A 0%, #FFC107 100%); }
    .inner { padding: 32px 28px; }
    .logo { display: block; max-width: 160px; height: auto; margin: 0 auto 24px; text-align: center; }
    .center { text-align: center; }
    h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #111827; text-align: center; }
    .sub { margin: 0 0 24px; font-size: 15px; color: #6b7280; text-align: center; }
    .copy { margin: 0 0 20px; font-size: 15px; color: #374151; }
    .copy p { margin: 0 0 12px; }
    .details { margin: 20px 0; padding: 20px; background: #f9fafb; border-radius: 10px; font-size: 14px; color: #4b5563; }
    .details p { margin: 0 0 8px; }
    .details p:last-child { margin-bottom: 0; }
    .details strong { color: #111827; display: inline-block; min-width: 90px; }
    .message-box { margin-top: 12px; padding: 14px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap; word-break: break-word; }
    .next { margin: 20px 0 0; padding: 16px; background: #eff6ff; border-radius: 8px; font-size: 14px; color: #1e40af; }
    .support { font-size: 13px; color: #6b7280; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; }
    .support a { color: #2563eb; text-decoration: none; }
    .support a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="brand-bar"></div>
      <div class="inner">
        <div class="center"><a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion"></a></div>
        <h1>We’ve received your message</h1>
        <p class="sub">Thanks for reaching out. Here’s what we have on file.</p>
        <div class="copy">
          <p>Hi ${fullName},</p>
          <p>Thank you for contacting StudyNotion. We’ve got your details and will get back to you as soon as we can—usually within 1–2 business days.</p>
        </div>
        <div class="details">
          <p><strong>Name</strong> ${firstname} ${lastname}</p>
          <p><strong>Email</strong> ${email}</p>
          <p><strong>Phone</strong> ${phoneDisplay}</p>
          <p><strong>Your message</strong></p>
          <div class="message-box">${message}</div>
        </div>
        <p class="next">If your question is urgent, you can reply to this email and we’ll prioritize it.</p>
        <div class="support">Need something else? Contact <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
