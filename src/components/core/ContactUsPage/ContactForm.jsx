import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="mb-8 sm:mb-10 border border-richblack-600 text-richblack-300 rounded-xl p-4 sm:p-6 lg:p-14 flex gap-2 sm:gap-3 flex-col min-w-0">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl leading-tight sm:leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-sm sm:text-base">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-4 sm:mt-7 min-w-0">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
