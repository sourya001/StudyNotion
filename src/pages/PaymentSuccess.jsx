import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { verifyPayment } from "../services/operations/studentFeaturesAPI"

function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (!token) {
      navigate("/login")
      return
    }
    if (!sessionId) {
      navigate("/dashboard/cart")
      return
    }
    verifyPayment(sessionId, token, navigate, dispatch)
  }, [sessionId, navigate, dispatch])

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-richblack-5">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-richblack-200 border-t-yellow-50" />
        <p className="text-lg">Verifying your payment...</p>
      </div>
    </div>
  )
}

export default PaymentSuccess
