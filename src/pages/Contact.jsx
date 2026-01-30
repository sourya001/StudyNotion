import React from "react"
import { motion } from "framer-motion"

import Footer from "../components/Common/Footer"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto mt-10 sm:mt-16 lg:mt-20 flex w-11/12 max-w-maxContent flex-col gap-8 sm:gap-10 text-white px-2 sm:px-0 lg:flex-row lg:justify-between"
      >
        {/* Contact Details */}
        <div className="w-full min-w-0 lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="w-full min-w-0 lg:w-[60%]">
          <ContactForm />
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}

export default Contact
