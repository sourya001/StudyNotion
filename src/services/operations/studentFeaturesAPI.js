import { toast } from "react-hot-toast"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const { COURSE_PAYMENT_API, COURSE_VERIFY_API } = studentEndpoints

export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  dispatch(setPaymentLoading(true))
  try {
    const frontendOrigin =
      window.location.origin || "http://localhost:3000"
    const successUrl = `${frontendOrigin}/payment/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${frontendOrigin}/dashboard/cart`

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
        success_url: successUrl,
        cancel_url: cancelUrl,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message || "Could not start payment")
    }

    const { url } = orderResponse.data
    if (url) {
      window.location.href = url
      return
    }

    throw new Error("No checkout URL received")
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error(error.message || "Could not start payment.")
    dispatch(setPaymentLoading(false))
  }
}

export async function verifyPayment(sessionId, token, navigate, dispatch) {
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      { session_id: sessionId },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message || "Payment verification failed")
    }

    toast.success("Payment successful. You are added to the course.")
    dispatch(resetCart())
    navigate("/dashboard/enrolled-courses")
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error(error.response?.data?.message || "Could not verify payment.")
    navigate("/dashboard/cart")
  } finally {
    dispatch(setPaymentLoading(false))
  }
}
