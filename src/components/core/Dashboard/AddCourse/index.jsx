import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full min-w-0 flex-col items-stretch gap-6 xl:flex-row xl:items-start xl:gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="mb-8 text-2xl font-medium text-richblack-5 sm:mb-10 sm:text-3xl lg:mb-14">
            Add Course
          </h1>
          <div className="min-w-0 flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips - below on small screens, sidebar on xl */}
        <div className="order-2 w-full min-w-0 shrink-0 rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:p-5 xl:order-none xl:sticky xl:top-10 xl:max-w-[400px] xl:flex-1 xl:p-6">
          <p className="mb-4 text-base font-medium text-richblack-5 sm:mb-6 sm:text-lg lg:mb-8">
            ⚡ Course Upload Tips
          </p>
          <ul className="ml-4 list-disc space-y-3 text-xs text-richblack-5 sm:ml-5 sm:space-y-4">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}
