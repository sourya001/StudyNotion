import { useEffect, useState } from "react"
import { VscChromeClose, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar({ open = false, onClose }) {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    onClose?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  const sidebarContent = (
    <div className="relative flex h-full min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 flex rounded p-1 text-richblack-400 hover:bg-richblack-700 hover:text-richblack-5 md:hidden"
        aria-label="Close menu"
      >
        <VscChromeClose className="text-xl" />
      </button>
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          )
        })}
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
      <div className="flex flex-col">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />
        <button
          type="button"
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
              btn1Danger: true,
            })
          }
          className="flex w-full items-center gap-x-2 px-8 py-2 text-left text-sm font-medium text-pink-200 transition-colors hover:bg-pink-900/20 hover:text-pink-100"
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div
        role="presentation"
        className={`fixed inset-0 top-[3.5rem] z-50 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed left-0 top-[3.5rem] z-50 h-[calc(100vh-3.5rem)] w-[220px] max-w-[85vw] transform transition-transform duration-200 ease-out md:relative md:top-0 md:block md:translate-x-0 md:transform-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
