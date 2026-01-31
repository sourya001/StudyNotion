import { useEffect, useState } from "react"
import { HiMenuAlt2 } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="h-[calc(100vh-3.5rem)] min-w-0 flex-1 overflow-auto">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="fixed right-4 top-[4.5rem] z-40 flex items-center gap-2 rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 md:hidden"
            aria-label="Open course menu"
          >
            <HiMenuAlt2 className="text-xl" />
            <span>Chapters</span>
          </button>
          <div className="mx-3 px-0 pt-16 pb-4 sm:mx-4 sm:pt-5 sm:pb-5 md:mx-6 md:py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
