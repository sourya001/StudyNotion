import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { VscChromeClose } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function VideoDetailsSidebar({ open = false, onClose }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  const handleNavigate = (path) => {
    navigate(path)
    onClose?.()
  }

  const sidebarContent = (
    <div className="flex h-full w-full flex-col border-r border-richblack-700 bg-richblack-800">
      <div className="mx-3 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-4 sm:mx-5 sm:py-5">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate("/dashboard/enrolled-courses")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 transition hover:scale-95 active:scale-90"
            title="Back to enrolled courses"
            aria-label="Back to enrolled courses"
          >
            <IoIosArrowBack size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex rounded p-1.5 text-richblack-400 hover:bg-richblack-700 hover:text-richblack-5 md:hidden"
            aria-label="Close menu"
          >
            <VscChromeClose className="text-xl" />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-richblack-25 sm:text-lg">
            {courseEntireData?.courseName}
          </p>
          <p className="text-xs font-semibold text-richblack-500 sm:text-sm">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            <div className="flex flex-row justify-between bg-richblack-600 px-3 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0 flex-1 font-semibold">
                <span className="line-clamp-2">{course?.sectionName}</span>
              </div>
              <span
                className={`ml-2 shrink-0 transition-transform duration-300 ${
                  activeStatus === course?._id ? "rotate-0" : "rotate-180"
                }`}
              >
                <BsChevronDown />
              </span>
            </div>

            {activeStatus === course?._id && (
              <div className="transition-[height] duration-300 ease-in-out">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNavigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="mt-0.5 shrink-0"
                    />
                    <span className="min-w-0 flex-1 truncate text-left">
                      {topic.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile: backdrop */}
      <div
        role="presentation"
        className={`fixed inset-0 top-[3.5rem] z-50 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar: overlay on mobile, inline on md+ */}
      <div
        className={`fixed left-0 top-[3.5rem] z-50 h-[calc(100vh-3.5rem)] w-[280px] max-w-[85vw] transform border-r border-richblack-700 transition-transform duration-200 ease-out md:relative md:top-0 md:block md:h-[calc(100vh-3.5rem)] md:w-[320px] md:max-w-[350px] md:translate-x-0 md:transform-none ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  )
}
