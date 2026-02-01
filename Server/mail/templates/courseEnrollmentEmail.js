exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You’re enrolled – StudyNotion</title>
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
    .copy { margin: 0 0 24px; text-align: left; font-size: 15px; color: #374151; }
    .copy p { margin: 0 0 12px; }
    .course-name { display: inline-block; margin: 12px 0 20px; padding: 14px 20px; background: linear-gradient(135deg, #fef9e7 0%, #fef3c7 100%); border-radius: 10px; font-size: 17px; font-weight: 600; color: #92400e; }
    .cta { display: inline-block; padding: 14px 28px; background: linear-gradient(90deg, #FFD60A 0%, #FFC107 100%); color: #000; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; margin-top: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
    .cta:hover { opacity: 0.95; }
    .steps { margin: 24px 0 0; text-align: left; font-size: 14px; color: #6b7280; }
    .steps p { margin: 0 0 8px; padding-left: 20px; position: relative; }
    .steps p::before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
    .support { font-size: 13px; color: #6b7280; margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
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
        <h1>You’re in! Welcome to the course</h1>
        <p class="sub">Your enrollment is confirmed. Time to start learning.</p>
        <div class="copy">
          <p>Hi ${name},</p>
          <p>You’re successfully enrolled in the course below. All materials are available in your dashboard—you can start whenever you’re ready.</p>
        </div>
        <div class="course-name">${courseName}</div>
        <div class="steps">
          <p>Open your dashboard to see the course</p>
          <p>Start with the first lesson when you’re ready</p>
          <p>Track your progress as you go</p>
        </div>
        <p style="margin-top: 24px;"><a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">Open my dashboard</a></p>
        <div class="support">Questions? Contact <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
