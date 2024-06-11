const Razorpay = require("razorpay");

const RAZORPAY_KEY = "rzp_test_fUIZAI25WMgGwi";

const RAZORPAY_SECRET = "o7TBIxOogcPsNQa9pTzsAoYf";

exports.instance = new Razorpay({
  key_id: RAZORPAY_KEY,
  key_secret: RAZORPAY_SECRET,
});
