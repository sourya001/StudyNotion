// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { ACCOUNT_TYPE } from "../utils/constants"
// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/Common/Footer"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import CourseCard from "../components/core/HomePage/CourseCard"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ChatSupportSection from "../components/core/HomePage/ChatSupportSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/Timeline"

// Three featured course widgets (hard-coded)
const FEATURED_COURSES = [
  {
    heading: "Learn HTML",
    description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
    level: "Beginner",
    lessionNumber: 6,
  },
  {
    heading: "Python",
    description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
    level: "Beginner",
    lessionNumber: 6,
  },
  {
    heading: "Nuxt.js",
    description: "Master the Vue-based framework for building fast, SEO-friendly web apps. Covers server-side rendering, static sites, and full-stack patterns.",
    level: "Beginner",
    lessionNumber: 6,
  },
]

function Home() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const getLearnMoreLink = (whenLoggedOut = "/signup") => {
    if (!token) return whenLoggedOut
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return "/dashboard/instructor"
    return "/all-courses"
  }

  const getTryItYourselfLink = () => {
    if (!token) return "/signup"
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return "/dashboard/add-course"
    return "/all-courses"
  }

  const getContinueLessonLink = () => {
    if (!token) return "/signup"
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return "/dashboard/my-courses"
    return "/dashboard/enrolled-courses"
  }

  const getExploreFullCatalogLink = () => {
    if (!token) return "/signup"
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return "/dashboard/my-courses"
    return "/all-courses"
  }

  return (
    <div>
      {/* Section 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-4 sm:gap-6 lg:gap-8 text-white px-1 sm:px-0"
      >
        {/* Become a Instructor Button - only when not logged in */}
        {!token && (
          <Link to="/signup?type=instructor">
            <div className="group mx-auto mt-12 sm:mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
              <div className="flex flex-row items-center gap-2 rounded-full px-6 sm:px-10 py-2 sm:py-[5px] text-sm sm:text-base transition-all duration-200 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>
        )}

        {/* Heading - add top spacing when logged in (no "Become an Instructor" button) */}
        <div
          className={`text-center text-2xl sm:text-3xl lg:text-4xl font-semibold px-2 ${token ? "mt-12 sm:mt-16" : ""}`}
        >
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-2 sm:-mt-3 w-full max-w-[90%] text-center text-sm sm:text-base lg:text-lg font-bold text-richblack-300 px-2">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-7 items-center">
          <CTAButton active={true} linkto={getLearnMoreLink()}>
            Learn More
          </CTAButton>
          <CTAButton
            active={false}
            linkto={token ? "/contact" : "/login"}
          >
            Book a Demo
          </CTAButton>
        </div>

        {/* Video */}
        <div className="mx-2 sm:mx-3 my-5 sm:my-7 w-full max-w-full overflow-hidden rounded-lg shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="w-full max-w-full h-auto shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center lg:text-left">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: getTryItYourselfLink(),
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: getLearnMoreLink(),
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-full text-2xl sm:text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: getContinueLessonLink(),
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: getLearnMoreLink(),
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Featured courses - three hard-coded widgets */}
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center my-8 sm:my-10 px-2">
            Unlock the
            <HighlightText text={"Power of Code"} />
            <p className="text-center text-richblack-300 text-base sm:text-lg font-semibold mt-1">
              Learn to Build Anything You Can Imagine
            </p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-10 justify-center w-full mb-0 sm:mb-2 lg:mb-0 px-3 lg:px-0">
            {FEATURED_COURSES.map((course, index) => (
              <CourseCard
                key={course.heading}
                cardData={course}
                currentCard=""
                setCurrentCard={() => {}}
                alwaysSelected={index === 0 || index === 2}
                alwaysUnselected={index === 1}
                interactive={false}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 -mt-5 sm:-mt-8 lg:-mt-8">
        <div className="homepage_bg h-[220px] sm:h-[280px] lg:h-[240px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-6 sm:gap-8 px-2 h-full min-h-0">
            <div className="hidden lg:block lg:h-[48px] flex-shrink-0"></div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 text-white lg:mt-2 items-center">
              <CTAButton active={true} linkto={getExploreFullCatalogLink()}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={getLearnMoreLink("/login")}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-6 sm:gap-8 px-2">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-8 sm:mb-10 mt-4 sm:mt-[-80px] lg:mt-8 flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-x-12 lg:gap-y-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center lg:text-left lg:min-w-0 lg:max-w-[45%] lg:flex-shrink-0">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-6 lg:min-w-0 lg:max-w-[50%] lg:flex-shrink-0">
              <div className="text-sm sm:text-[16px] text-center lg:text-left">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={getLearnMoreLink()}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 - Personal chat support (visible to all) */}
      <div className="relative mx-auto my-12 sm:my-16 lg:my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 py-10 sm:py-14 rounded-2xl bg-richblack-900 text-white border border-richblack-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        <ChatSupportSection />
      </div>

      {/* Section 4 - Become an instructor section (only when not logged in) */}
      {!token && (
        <div className="relative mx-auto my-12 sm:my-16 lg:my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-6 sm:gap-8 px-2 bg-richblack-900 text-white">
          <InstructorSection />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
