/**
 * StudyNotion platform knowledge chunks for RAG.
 * Each string is a chunk that will be embedded and stored for retrieval.
 */
module.exports = [
  "StudyNotion is an online learning platform where students can browse and enroll in courses and instructors can create and manage courses.",
  "Students can browse courses by category using the Catalog page. Each catalog shows courses in that category.",
  "Students can view detailed course information on the Course Details page, including description, curriculum, and instructor.",
  "Students add courses to the Cart from the Course Details page and complete payment to enroll.",
  "After payment, students access enrolled courses from the Dashboard under Enrolled Courses. They can watch video lessons in the View Course page.",
  "Instructors create new courses from the Dashboard via Add Course. They can add sections and subsections to build the curriculum.",
  "Instructors manage their courses from My Courses in the Dashboard. They can edit or delete courses and view instructor analytics.",
  "All users sign up with email. Email verification via OTP is required after signup.",
  "Users log in with email and password. Forgot Password allows resetting password via email link.",
  "Logged-in users can update their profile and display picture from Dashboard > My Profile and change password from Settings.",
  "The Contact page allows users to send a message to support. Use it for help or feedback.",
  "Home page shows the main landing content. About page describes the platform. All Courses lists every course.",
  "Students have a Cart in the navbar. Only students see the Cart; instructors see My Courses and Add Course in the dashboard.",
  "Dashboard links depend on role: Students see Enrolled Courses and Cart; Instructors see Instructor, My Courses, Add Course, and Edit Course for each course.",
  "View Course is the video player page for enrolled students. Navigate sections and subsections to watch lectures.",
  "Course ratings and reviews can be submitted by enrolled students from the Course Details page.",
  "Catalog URL is /catalog/:catalogName where catalogName is the category slug. Course details URL is /courses/:courseId.",
  "Dashboard routes: /dashboard/my-profile, /dashboard/Settings, /dashboard/enrolled-courses (students), /dashboard/instructor, /dashboard/my-courses, /dashboard/add-course, /dashboard/edit-course/:courseId (instructors).",
  "Payment is handled securely. After successful payment users are redirected to the payment success page.",
  "Instructors can add multiple sections to a course. Each section can have multiple subsections (video lessons or content).",
];
