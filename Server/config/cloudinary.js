const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		if (process.env.CLOUDINARY_URL) {
			cloudinary.config(process.env.CLOUDINARY_URL);
		} else if (process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET) {
			cloudinary.config({
				cloud_name: process.env.CLOUD_NAME,
				api_key: process.env.API_KEY,
				api_secret: process.env.API_SECRET,
			});
		} else {
			console.warn("Cloudinary: Set CLOUDINARY_URL or CLOUD_NAME, API_KEY, API_SECRET in .env");
		}
	} catch (error) {
		console.error("Cloudinary config error:", error);
	}
};
