exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password updated – StudyNotion</title>
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
    .account { margin: 16px 0; padding: 14px 18px; background: #f3f4f6; border-radius: 8px; font-size: 14px; color: #4b5563; word-break: break-all; }
    .warning { font-size: 14px; color: #b45309; margin: 16px 0 0; padding: 12px 16px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b; text-align: left; }
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
        <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion"></a>
        <h1>Your password has been updated</h1>
        <p class="sub">Your StudyNotion account is now using the new password.</p>
        <div class="copy">
          <p>Hi ${name},</p>
          <p>We’re confirming that the password for your StudyNotion account was changed successfully. You can sign in with your new password from now on.</p>
        </div>
        <div class="account">Account: <strong>${email}</strong></div>
        <div class="warning">If you didn’t make this change, please contact us right away so we can help secure your account.</div>
        <div class="support">Need help? Contact <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
