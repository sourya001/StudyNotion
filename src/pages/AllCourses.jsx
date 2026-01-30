import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"

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
    <div className="rounded-lg">
      <img
        src={course?.thumbnail}
        alt="course thumbnail"
        className="h-[400px] w-full rounded-xl object-cover"
      />
      <div className="flex flex-col gap-2 px-1 py-3">
        <p className="text-xl text-richblack-5">{course?.courseName}</p>
        <p className="text-sm text-richblack-50">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>
        <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="bg-richblack-900">
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <h1 className="mb-2 text-3xl font-semibold text-richblack-5">
          All Courses
        </h1>
        <p className="mb-8 text-richblack-200">
          Browse all available courses. Log in to view details and purchase.
        </p>
        {courses?.length === 0 ? (
          <p className="py-12 text-center text-richblack-400">
            No courses available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course._id}>
                {token ? (
                  <Link
                    to={`/courses/${course._id}`}
                    className="block cursor-pointer"
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
                    className="cursor-pointer"
                  >
                    <CourseCard course={course} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default AllCourses
