import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-full max-w-full px-2 sm:px-0">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold text-richblack-5">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-2 sm:mt-3 text-sm sm:text-base px-2">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-6 sm:mt-12 mx-auto w-full">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
