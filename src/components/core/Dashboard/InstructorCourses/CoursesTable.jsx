import { useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:hidden">
        {courses?.length === 0 ? (
          <div className="rounded-xl border border-richblack-800 bg-richblack-800/50 px-4 py-10 text-center text-base font-medium text-richblack-100">
            No courses found
          </div>
        ) : (
          courses?.map((course) => (
            <div
              key={course._id}
              className="flex flex-col gap-3 rounded-xl border border-richblack-800 bg-richblack-800/50 p-3"
            >
              <div className="flex gap-3">
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className="h-20 w-28 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-richblack-300">
                    {(course.courseDescription || "")
                      .split(" ")
                      .slice(0, 15)
                      .join(" ")}
                    {(course.courseDescription || "").split(" ").length > 15
                      ? "..."
                      : ""}
                  </p>
                  <p className="mt-1 text-[10px] text-richblack-400">
                    Created: {formatDate(course.createdAt)}
                  </p>
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-richblack-700 px-2 py-0.5 text-[10px] font-medium text-pink-100">
                      <HiClock size={10} /> Drafted
                    </span>
                  ) : (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-richblack-700 px-2 py-0.5 text-[10px] font-medium text-yellow-100">
                      <FaCheck size={6} /> Published
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-richblack-700 pt-3">
                <span className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </span>
                <div className="flex gap-1 [&_button]:text-richblack-100 [&_button]:disabled:opacity-50">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    title="Edit"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-richblack-700 transition-colors hover:bg-richblack-600 hover:text-caribbeangreen-300 active:scale-95"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-richblack-700 transition-colors hover:bg-richblack-600 hover:text-[#ff0000] active:scale-95"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden min-w-0 overflow-x-auto rounded-xl border border-richblack-800 sm:block sm:mx-0 sm:px-0">
        <Table className="w-full min-w-[320px] rounded-xl border-0 sm:min-w-[500px] lg:min-w-[640px]">
          <Thead>
            <Tr className="flex gap-x-4 rounded-t-xl border-b border-b-richblack-800 px-3 py-2 sm:gap-x-6 sm:px-4 md:gap-x-10 md:px-6">
              <Th className="min-w-0 flex-1 text-left text-xs font-medium uppercase text-richblack-100 sm:text-sm">
                Courses
              </Th>
              <Th className="min-w-[60px] shrink-0 text-left text-xs font-medium uppercase text-richblack-100 sm:min-w-[80px] sm:text-sm">
                Price
              </Th>
              <Th className="min-w-[72px] shrink-0 text-left text-xs font-medium uppercase text-richblack-100 sm:min-w-[100px] sm:text-sm">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-8 text-center text-lg font-medium text-richblack-100 sm:py-10 sm:text-2xl">
                  No courses found
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="flex gap-x-4 border-b border-richblack-800 px-3 py-4 sm:gap-x-6 sm:px-4 sm:py-6 md:gap-x-10 md:px-6 md:py-8"
                >
                  <Td className="flex min-w-0 flex-1 gap-x-2 sm:gap-x-3 md:gap-x-4">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-16 w-24 shrink-0 rounded-lg object-cover sm:h-[100px] sm:w-[140px] md:h-[148px] md:w-[220px]"
                    />
                    <div className="min-w-0 flex-1 flex flex-col justify-between gap-1">
                      <p className="line-clamp-2 text-base font-semibold text-richblack-5 sm:text-lg">
                        {course.courseName}
                      </p>
                      <p className="line-clamp-2 text-xs text-richblack-300 sm:line-clamp-3">
                        {(course.courseDescription || "")
                          .split(" ")
                          .length > TRUNCATE_LENGTH
                          ? (course.courseDescription || "")
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription || ""}
                      </p>
                      <p className="text-[11px] text-richblack-400 sm:text-[12px] sm:text-white">
                        Created: {formatDate(course.createdAt)}
                      </p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex w-fit flex-row items-center gap-1.5 rounded-full bg-richblack-700 px-1.5 py-[2px] text-[11px] font-medium text-pink-100 sm:gap-2 sm:px-2 sm:text-[12px]">
                          <HiClock size={12} className="sm:w-[14px] sm:h-[14px]" />
                          Drafted
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-1.5 rounded-full bg-richblack-700 px-1.5 py-[2px] text-[11px] font-medium text-yellow-100 sm:gap-2 sm:px-2 sm:text-[12px]">
                          <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-yellow-100 text-richblack-700 sm:h-3 sm:w-3">
                            <FaCheck size={6} className="sm:w-2 sm:h-2" />
                          </div>
                          Published
                        </p>
                      )}
                    </div>
                  </Td>
                  <Td className="flex min-w-[60px] shrink-0 items-center text-xs font-medium text-richblack-100 sm:min-w-[80px] sm:text-sm">
                    ₹{course.price}
                  </Td>
                  <Td className="flex min-w-[72px] shrink-0 items-center gap-0.5 sm:min-w-[100px] sm:gap-1 [&_button]:text-richblack-100 [&_button]:disabled:opacity-50">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Edit"
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 active:scale-95 sm:px-2 sm:min-w-0 sm:min-h-0"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                      title="Delete"
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 hover:text-[#ff0000] active:scale-95 sm:px-1 sm:min-w-0 sm:min-h-0"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
