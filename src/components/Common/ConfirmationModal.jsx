import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  const isDanger = modalData?.btn1Danger === true
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses={
              isDanger
                ? "!bg-pink-600 !text-white hover:!bg-pink-500"
                : undefined
            }
          />
          <button
            type="button"
            className="cursor-pointer rounded-md bg-richblack-700 py-[8px] px-[20px] font-semibold text-richblack-5 transition-colors hover:bg-richblack-600"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
