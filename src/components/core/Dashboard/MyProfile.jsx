import { motion } from "framer-motion"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h1 className="mb-8 text-2xl font-medium text-richblack-5 sm:mb-14 sm:text-3xl">
        My Profile
      </h1>
      <div className="flex flex-col gap-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:px-12">
        <div className="flex min-w-0 flex-shrink items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square h-14 w-14 flex-shrink-0 rounded-full object-cover sm:h-[78px] sm:w-[78px]"
          />
          <div className="min-w-0 space-y-1">
            <p className="truncate text-base font-semibold text-richblack-5 sm:text-lg">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="truncate text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          customClasses="self-start sm:self-center"
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-8 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:my-10 sm:gap-y-10 sm:p-8 sm:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="self-start sm:self-center"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } min-w-0 text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-8 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:my-10 sm:gap-y-10 sm:p-8 sm:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="self-start sm:self-center"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex min-w-0 flex-col gap-8 sm:max-w-[500px] sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="break-words text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
