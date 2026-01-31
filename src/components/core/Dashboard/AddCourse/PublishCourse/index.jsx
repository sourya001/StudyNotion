import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../Common/IconBtn"

export default function PublishCourse() {
  const { handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    formData.append("status", COURSE_STATUS.PUBLISHED)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:p-6">
      <p className="text-xl font-semibold text-richblack-5 sm:text-2xl">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(handleCoursePublish)}>
        <p className="my-4 rounded-lg border-2 border-red-500 bg-red-500/30 px-4 py-3 text-base font-semibold sm:my-6 sm:px-5 sm:py-3.5 sm:text-lg" style={{ color: "#f87171" }}>
          This course is going public
        </p>
        <div className="ml-auto flex max-w-full flex-wrap items-center justify-end">
          <IconBtn disabled={loading} text="Submit" type="submit" />
        </div>
      </form>
    </div>
  )
}
