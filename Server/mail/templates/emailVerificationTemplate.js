const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email – StudyNotion</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #1f2937; }
    .wrapper { padding: 24px 16px; max-width: 520px; margin: 0 auto; }
    .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden; }
    .brand-bar { height: 4px; background: linear-gradient(90deg, #FFD60A 0%, #FFC107 100%); }
    .inner { padding: 32px 28px; text-align: center; }
    .logo { display: block; max-width: 160px; height: auto; margin: 0 auto 24px; }
    h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #111827; }
    .sub { margin: 0 0 24px; font-size: 15px; color: #6b7280; }
    .copy { margin: 0 0 20px; text-align: left; font-size: 15px; color: #374151; }
    .copy p { margin: 0 0 12px; }
    .otp-box { display: inline-block; margin: 8px 0 24px; padding: 16px 28px; background: #fef9e7; border: 2px dashed #FFD60A; border-radius: 10px; }
    .otp-code { font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #111827; font-family: 'SF Mono', Monaco, monospace; }
    .validity { font-size: 13px; color: #6b7280; margin: 0 0 8px; }
    .security { font-size: 13px; color: #9ca3af; margin: 16px 0 0; padding-top: 16px; border-top: 1px solid #e5e7eb; }
    .support { font-size: 13px; color: #6b7280; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    .support a { color: #2563eb; text-decoration: none; }
    .support a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="brand-bar"></div>
      <div class="inner">
        <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://studynotion-edtech-project.vercel.app/logo512.png" alt="StudyNotion"></a>
        <h1>Verify your email address</h1>
        <p class="sub">You’re one step away from joining StudyNotion</p>
        <div class="copy">
          <p>Use the code below to complete your registration. Enter it on the verification screen.</p>
        </div>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <p class="validity">This code expires in <strong>5 minutes</strong>.</p>
        <p class="security">If you didn’t create an account with StudyNotion, you can safely ignore this email.</p>
        <div class="support">Questions? Reply to this email or contact <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
module.exports = otpTemplate;
