import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"

const Button = ({ children, active, linkto }) => {
  const { token } = useSelector((state) => state.auth)
  const location = useLocation()
  const navigate = useNavigate()
  const isContactPage = location.pathname === "/contact"

  const handleClick = (e) => {
    // On contact page, allow the link/button to work normally
    if (isContactPage) return
    // When logged out, show toast and take them to the designated page (login/signup)
    if (!token) {
      e.preventDefault()
      toast.error("Please log in or sign up first")
      navigate(linkto || "/login")
    }
  }

  return (
    <Link to={linkto} onClick={handleClick}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          active ? "bg-yellow-50 text-black " : "bg-richblack-800"
        } hover:shadow-none hover:scale-95 transition-all duration-200 `}
      >
        {children}
      </div>
    </Link>
  )
}

export default Button
