/**
 * One-time script to add the demo user to the database.
 * Run from project root: node Server/scripts/seedDemoUser.js
 * Requires MONGODB_URL in Server/.env (or root .env)
 */

const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })
require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Profile = require("../models/Profile")

const DEMO_EMAIL = "demo@gmail.com"
const DEMO_PASSWORD = "12345678"

async function seedDemoUser() {
  const MONGODB_URL = process.env.MONGODB_URL
  if (!MONGODB_URL) {
    console.error("Missing MONGODB_URL in .env")
    process.exit(1)
  }

  await mongoose.connect(MONGODB_URL)
  console.log("DB connected")

  const existing = await User.findOne({ email: DEMO_EMAIL })
  if (existing) {
    console.log("Demo user already exists:", DEMO_EMAIL)
    await mongoose.disconnect()
    process.exit(0)
  }

  const profile = await Profile.create({
    gender: "Male",
    dateOfBirth: "1990-01-01",
    about: "Demo account for testing",
    contactNumber: 9876543210,
  })
  console.log("Created demo profile:", profile._id)

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10)
  const user = await User.create({
    firstName: "Demo",
    lastName: "User",
    email: DEMO_EMAIL,
    password: hashedPassword,
    authProvider: "local",
    accountType: "Student",
    active: true,
    approved: true,
    additionalDetails: profile._id,
    courses: [],
    courseProgress: [],
    image:
      "https://api.dicebear.com/5.x/initials/svg?seed=Demo User",
  })
  console.log("Created demo user:", user.email)
  await mongoose.disconnect()
  console.log("Done. You can sign in with:", DEMO_EMAIL, "/", DEMO_PASSWORD)
}

seedDemoUser().catch((err) => {
  console.error(err)
  process.exit(1)
})
