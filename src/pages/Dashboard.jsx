import { useState } from "react"
import { HiMenuAlt2 } from "react-icons/hi"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="h-[calc(100vh-3.5rem)] min-w-0 flex-1 overflow-auto">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed right-4 top-[4.5rem] z-40 flex items-center gap-2 rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 md:hidden"
          aria-label="Open menu"
        >
          <HiMenuAlt2 className="text-xl" />
          <span>Menu</span>
        </button>
        <div className="mx-auto w-11/12 max-w-[1200px] px-1 py-10 pt-20 md:pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
