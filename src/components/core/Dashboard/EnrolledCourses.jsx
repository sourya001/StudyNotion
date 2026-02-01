import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token)
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="my-8 hidden md:block">
            <div className="flex rounded-t-lg bg-richblack-500 ">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`flex items-center border border-richblack-700 ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={i}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300 line-clamp-2">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                <div className="flex min-w-0 flex-1 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {enrolledCourses.map((course, i) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }
                }}
                className="flex flex-col overflow-hidden rounded-lg border border-richblack-700 bg-richblack-800"
                key={i}
              >
                <div className="flex gap-3 p-4">
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="mt-1 text-xs text-richblack-400">
                      Duration: {course?.totalDuration}
                    </p>
                    <p className="mt-1 text-sm text-yellow-50">
                      Progress: {course.progressPercentage || 0}%
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-3">
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="6px"
                    isLabelVisible={false}
                  />
                </div>
                <p className="line-clamp-2 px-4 pb-4 text-xs text-richblack-400">
                  {course.courseDescription.length > 80
                    ? `${course.courseDescription.slice(0, 80)}...`
                    : course.courseDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
