import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    if (!token) return
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      setCourses(Array.isArray(result) ? result : [])
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <motion.div
      className="min-w-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mb-8 flex min-w-0 flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:mb-14">
        <h1 className="text-2xl font-medium text-richblack-5 sm:text-3xl">
          My Courses
        </h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </motion.div>
  )
}
