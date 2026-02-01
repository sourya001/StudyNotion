import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-style w-full"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="form-style w-full !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 min-h-[44px] rounded-lg bg-yellow-50 px-5 py-3 font-semibold text-richblack-900 shadow-[0_2px_8px_rgba(254,215,0,0.25)] transition-all duration-200 hover:bg-yellow-100 hover:shadow-[0_4px_12px_rgba(254,215,0,0.35)] focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-2 focus:ring-offset-richblack-900 active:scale-[0.98]"
      >
        Sign In
      </button>
      <div className="mt-6 rounded-lg border border-richblack-700 bg-richblack-800/50 px-4 py-3 text-center">
        <p className="text-sm text-richblack-200">
          Did not receive OTP / Unable to sign in? No problem, we are here.
        </p>
        <p className="mt-2 text-xs text-richblack-400">
          Demo ID: demo@gmail.com
        </p>
        <p className="text-xs text-richblack-400">Password: 12345678</p>
      </div>
    </form>
  )
}

export default LoginForm
