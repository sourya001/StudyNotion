const BASE_URL = process.env.REACT_APP_BASE_URL
const API_BASE = BASE_URL ? `${BASE_URL}/api/v1` : ""

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: API_BASE + "/auth/sendotp",
  SIGNUP_API: API_BASE + "/auth/signup",
  LOGIN_API: API_BASE + "/auth/login",
  RESETPASSTOKEN_API: API_BASE + "/auth/reset-password-token",
  RESETPASSWORD_API: API_BASE + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: API_BASE + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: API_BASE + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: API_BASE + "/profile/instructorDashboard",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: API_BASE + "/payment/capturePayment",
  COURSE_VERIFY_API: API_BASE + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: API_BASE + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: API_BASE + "/course/getAllCourses",
  COURSE_DETAILS_API: API_BASE + "/course/getCourseDetails",
  EDIT_COURSE_API: API_BASE + "/course/editCourse",
  COURSE_CATEGORIES_API: API_BASE + "/course/showAllCategories",
  CREATE_COURSE_API: API_BASE + "/course/createCourse",
  CREATE_SECTION_API: API_BASE + "/course/addSection",
  CREATE_SUBSECTION_API: API_BASE + "/course/addSubSection",
  UPDATE_SECTION_API: API_BASE + "/course/updateSection",
  UPDATE_SUBSECTION_API: API_BASE + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: API_BASE + "/course/getInstructorCourses",
  DELETE_SECTION_API: API_BASE + "/course/deleteSection",
  DELETE_SUBSECTION_API: API_BASE + "/course/deleteSubSection",
  DELETE_COURSE_API: API_BASE + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    API_BASE + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: API_BASE + "/course/updateCourseProgress",
  CREATE_RATING_API: API_BASE + "/course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: API_BASE + "/course/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: API_BASE + "/course/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: API_BASE + "/course/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: API_BASE + "/reach/contact",
}

// CHATBOT API
export const chatEndpoints = {
  CHAT_API: API_BASE + "/chat",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: API_BASE + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: API_BASE + "/profile/updateProfile",
  CHANGE_PASSWORD_API: API_BASE + "/auth/changepassword",
  DELETE_PROFILE_API: API_BASE + "/profile/deleteProfile",
}
