const express = require("express");
const router = express.Router();
const { chatController } = require("../controllers/Chat");

router.post("/", chatController);

module.exports = router;
