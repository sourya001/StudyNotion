import React from "react"
import { useSelector } from "react-redux"
import HighlightText from "../../../components/core/HomePage/HighlightText"
import CTAButton from "../../../components/core/HomePage/Button"
import { ACCOUNT_TYPE } from "../../../utils/constants"

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const getLearnMoreLink = () => {
    if (!token) return "/"
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return "/dashboard/instructor"
    return "/all-courses"
  }

  return (
    <div className="grid mx-auto w-full max-w-[350px] xl:max-w-none xl:w-fit grid-cols-1 xl:grid-cols-4 mb-8 sm:mb-12 gap-0 xl:gap-0">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:min-h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-richblack-700 min-h-[220px] sm:min-h-[254px] xl:h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 min-h-[220px] sm:min-h-[254px] xl:h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 p-4 sm:p-6 xl:p-8 pb-8 xl:pb-0">
                <div className="text-2xl sm:text-3xl xl:text-4xl font-semibold">
                  {card.heading}
                  <HighlightText text={card.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium text-sm sm:text-base">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnText === "Learn More" ? getLearnMoreLink() : card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6 xl:p-8 flex flex-col gap-4 sm:gap-6 xl:gap-8">
                <h1 className="text-richblack-5 text-base sm:text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium text-sm sm:text-base">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
