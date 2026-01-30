import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-20 items-center px-2">
          <div className="w-full max-w-full lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="w-full max-w-full h-auto object-contain shadow-white shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-6 sm:gap-10 flex-col text-center lg:text-left">
            <h1 className="lg:w-[50%] text-2xl sm:text-3xl lg:text-4xl font-semibold ">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-sm sm:text-[16px] text-justify w-full max-w-[90%] mx-auto lg:mx-0 text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup?type=instructor"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection