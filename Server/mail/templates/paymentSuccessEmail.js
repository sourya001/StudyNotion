exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment received – StudyNotion</title>
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
    .copy { margin: 0 0 20px; font-size: 15px; color: #374151; text-align: left; }
    .copy p { margin: 0 0 12px; }
    .receipt { margin: 24px 0; padding: 24px; background: #f9fafb; border-radius: 12px; text-align: left; }
    .receipt-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    .receipt-row:last-child { border-bottom: none; }
    .receipt-label { color: #6b7280; }
    .receipt-value { font-weight: 600; color: #111827; word-break: break-all; }
    .amount { font-size: 24px; font-weight: 700; color: #059669; }
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
        <h1>Payment received – thank you</h1>
        <p class="sub">Your purchase is confirmed. Here are the details for your records.</p>
        <div class="copy">
          <p>Hi ${name},</p>
          <p>We’ve received your payment. Your course access is active and available in your dashboard.</p>
        </div>
        <div class="receipt">
          <div class="receipt-row">
            <span class="receipt-label">Amount paid</span>
            <span class="receipt-value amount">₹${amount}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Order ID</span>
            <span class="receipt-value">${orderId}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Payment ID</span>
            <span class="receipt-value">${paymentId}</span>
          </div>
        </div>
        <p style="font-size: 14px; color: #6b7280; margin: 0;">Keep this email for your records. If you have any questions about your purchase, include your Order ID when you contact us.</p>
        <div class="support">Need help? Contact <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
