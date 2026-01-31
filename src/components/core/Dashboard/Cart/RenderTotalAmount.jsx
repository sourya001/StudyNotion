import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="w-full min-w-0 shrink-0 rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:p-5 lg:min-w-[280px] lg:max-w-[320px] lg:p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-4 text-2xl font-medium text-yellow-100 sm:mb-5 sm:text-3xl lg:mb-6">
        ₹ {total}
      </p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}
