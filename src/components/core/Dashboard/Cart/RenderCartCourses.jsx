import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full min-w-0 flex-col gap-4 sm:gap-5 ${
            indx !== cart.length - 1 ? "border-b border-b-richblack-400 pb-5 sm:pb-6" : ""
          } ${indx !== 0 ? "mt-5 sm:mt-6" : ""}`}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 xl:flex-row xl:items-start">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-32 w-full shrink-0 rounded-lg object-cover sm:h-36 sm:max-w-[200px] xl:h-[148px] xl:w-[220px]"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="line-clamp-2 break-words text-base font-medium text-richblack-5 sm:text-lg">
                {course?.courseName}
              </p>
              <p className="text-xs text-richblack-300 sm:text-sm">
                {course?.category?.name}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end sm:gap-4">
            <p className="order-2 text-xl font-medium text-yellow-100 sm:order-1 sm:mb-0 sm:text-2xl xl:text-3xl">
              ₹ {course?.price}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="order-1 flex items-center gap-x-1.5 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm text-pink-200 hover:bg-richblack-600 sm:order-2 sm:px-[12px] sm:py-3"
            >
              <RiDeleteBin6Line className="shrink-0 text-base sm:text-lg" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
