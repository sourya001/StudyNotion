import React from "react"
import { useSelector } from "react-redux"
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa"
import HighlightText from "./HighlightText"
import chatSupportImage from "../../../assets/Images/chat-support.png"

const ChatSupportSection = () => {
  const { token } = useSelector((state) => state.auth)

  const handleTryNow = () => {
    window.dispatchEvent(new CustomEvent("openChatbot"))
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row-reverse gap-12 sm:gap-16 lg:gap-20 items-center px-2">
        {/* Image: transparent asset with blue-accent frame to match chat bubbles */}
        <div className="w-full max-w-full lg:w-[50%]">
          <div className="relative overflow-hidden rounded-2xl bg-richblack-800/30 ring-1 ring-blue-25/40 shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_0_1px_rgba(180,218,236,0.08)]">
            <img
              src={chatSupportImage}
              alt="Personal chat support"
              className="w-full max-w-full h-auto object-contain p-6 sm:p-8"
            />
          </div>
        </div>
        {/* Text block: improved spacing and typography */}
        <div className="lg:w-[50%] flex gap-6 sm:gap-8 flex-col text-center lg:text-left lg:pl-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-richblack-5">
            Personal
            <HighlightText text={"chat support"} />
          </h1>

          <p className="font-medium text-sm sm:text-base text-justify w-full max-w-[90%] mx-auto lg:mx-0 text-richblack-300 leading-relaxed tracking-wide">
            Get instant help about courses, signup, dashboard, and more. Our
            assistant is available when you are logged in. Look for the yellow
            chat icon at the bottom right of the page.
          </p>

          <div className="w-fit mx-auto lg:mx-0 pt-1">
            {token ? (
              <button
                type="button"
                onClick={handleTryNow}
                className="text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] bg-yellow-50 text-black hover:shadow-none hover:scale-95 transition-all duration-200 flex items-center gap-3"
              >
                Try now
                <FaArrowRight />
              </button>
            ) : (
              <CTAButton active={true} linkto={"/login"}>
                <div className="flex items-center gap-3">
                  Log in to chat
                  <FaArrowRight />
                </div>
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSupportSection
