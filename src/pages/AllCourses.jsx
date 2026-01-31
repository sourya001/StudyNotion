import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

import Footer from "../components/Common/Footer"
import { getAllCourses } from "../services/operations/courseDetailsAPI"

function AllCourses() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await getAllCourses()
        setCourses(Array.isArray(result) ? result : [])
      } catch (err) {
        setCourses([])
      }
      setLoading(false)
    })()
  }, [])

  const handleCourseClick = (e) => {
    if (!token) {
      e.preventDefault()
      toast.error("Please log in to view and buy courses")
      navigate("/login")
    }
  }

  const CourseCard = ({ course }) => (
    <div className="group flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-richblack-800/50 shadow-md ring-1 ring-richblack-700/50 transition-all duration-300 hover:ring-richblack-600 hover:shadow-lg hover:shadow-yellow-25/5 sm:shadow-lg sm:hover:shadow-xl">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-xl bg-richblack-700 sm:aspect-[4/3]">
        <img
          src={course?.thumbnail}
          alt={course?.courseName || "course thumbnail"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-3 py-3 sm:gap-2 sm:px-4 sm:py-4">
        <p className="line-clamp-2 min-h-[2.5em] break-words text-sm font-medium leading-snug text-richblack-5 sm:min-h-0 sm:text-base sm:leading-normal md:text-lg">
          {course?.courseName}
        </p>
        <p className="truncate text-xs text-richblack-400 sm:text-sm">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>
        <p className="text-base font-semibold text-yellow-25 sm:text-lg md:text-xl">
          Rs. {course?.price}
        </p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 px-4">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-richblack-900">
      {/* Hero - compact on small screens to avoid orphaned text */}
      <div className="bg-richblack-800 px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto flex min-h-0 min-w-0 max-w-maxContentTab flex-col justify-center gap-2 sm:min-h-[200px] sm:gap-3 lg:max-w-maxContent lg:min-h-[220px] lg:gap-4 lg:py-4">
          <p className="text-xs text-richblack-400 sm:text-sm">
            Home / <span className="text-yellow-25">All Courses</span>
          </p>
          <h1 className="text-2xl font-semibold text-richblack-5 sm:text-3xl lg:text-4xl">
            All Courses
          </h1>
          <p className="max-w-[640px] text-sm leading-snug text-richblack-200 sm:text-base">
            Browse all available courses. Log in to view details and{"\u00A0"}purchase.
          </p>
        </div>
      </div>

      {/* Content - extra bottom padding on small screens for floating chatbot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-maxContentTab px-4 pb-24 pt-6 sm:max-w-full sm:px-6 sm:pb-12 sm:pt-8 lg:max-w-maxContent lg:px-8 lg:py-12"
      >
        {courses?.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl bg-richblack-800/50 px-4 py-10 text-center sm:min-h-[280px] sm:py-12">
            <p className="text-sm text-richblack-400 sm:text-base md:text-lg">
              No courses available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {courses.map((course) => (
              <div key={course._id} className="min-w-0 w-full">
                {token ? (
                  <Link
                    to={`/courses/${course._id}`}
                    className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-yellow-25 focus-visible:ring-offset-2 focus-visible:ring-offset-richblack-900 rounded-xl"
                  >
                    <CourseCard course={course} />
                  </Link>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handleCourseClick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleCourseClick(e)
                    }}
                    className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-yellow-25 focus-visible:ring-offset-2 focus-visible:ring-offset-richblack-900 rounded-xl"
                  >
                    <CourseCard course={course} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
      <Footer />
    </div>
  )
}

export default AllCourses
