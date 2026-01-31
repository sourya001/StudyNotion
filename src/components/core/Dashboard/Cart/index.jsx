import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <>
      <h1 className="mb-6 text-2xl font-medium text-richblack-5 sm:mb-10 sm:text-3xl lg:mb-14">
        Cart
      </h1>
      <p className="border-b border-b-richblack-400 pb-2 text-sm font-semibold text-richblack-400 sm:text-base">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-6 flex w-full min-w-0 flex-col-reverse items-stretch gap-6 sm:mt-8 sm:gap-8 lg:flex-row lg:items-start lg:gap-10">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-8 text-center text-xl text-richblack-100 sm:mt-12 sm:text-2xl lg:mt-14 lg:text-3xl">
          Your cart is empty
        </p>
      )}
    </>
  )
}
