import { Fragment } from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full min-w-0 justify-center">
        {steps.map((item) => (
          <Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className={`grid cursor-default aspect-square w-8 place-items-center rounded-full border sm:w-[34px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id ? "bg-yellow-50 text-yellow-50" : ""}`}
              >
                {step > item.id ? (
                  <FaCheck className="text-sm font-bold text-richblack-900 sm:text-base" />
                ) : (
                  <span className="text-sm sm:text-base">{item.id}</span>
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <div
                className={`h-[calc(32px/2)] w-[33%] border-dashed border-b-2 sm:h-[calc(34px/2)] ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>

      <div className="relative mb-8 flex w-full min-w-0 select-none justify-between gap-1 sm:mb-12 lg:mb-16">
        {steps.map((item) => (
          <Fragment key={item.id}>
            <div className="flex min-w-0 flex-1 flex-col items-center gap-y-1 sm:gap-y-2">
              <p
                className={`text-center text-xs sm:text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
