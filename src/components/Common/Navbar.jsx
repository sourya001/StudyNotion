import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AiOutlineHome, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown, BsChevronRight, BsXLg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import { VscSignOut } from "react-icons/vsc"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { logout } from "../../services/operations/authAPI"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // Close hamburger menu when user scrolls
  useEffect(() => {
    const handleScroll = () => setMobileMenuOpen(false)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset catalog dropdown when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) setMobileCatalogOpen(false)
  }, [mobileMenuOpen])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              if (link.title === "All Courses" && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return null
              return (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg border border-richblack-600 bg-richblack-800 p-4 text-richblack-5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded border-l border-t border-richblack-600 bg-richblack-800"></div>
                        {loading ? (
                          <p className="text-center text-richblack-400">Loading...</p>
                        ) : subLinks?.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg py-3 pl-4 text-richblack-5 transition-colors hover:bg-richblack-700 hover:text-yellow-25"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center text-richblack-400">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            )
            })}
            {token && user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <li>
                <Link to="/dashboard/enrolled-courses">
                  <p
                    className={
                      matchRoute("/dashboard/enrolled-courses")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }
                  >
                    Enrolled Courses
                  </p>
                </Link>
              </li>
            )}
            {token && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <li>
                <Link to="/dashboard/my-courses">
                  <p
                    className={
                      matchRoute("/dashboard/my-courses")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }
                  >
                    My Courses
                  </p>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center justify-end gap-x-4 md:flex md:flex-shrink-0">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        {/* Mobile: Home icon + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-richblack-100 transition-colors hover:bg-richblack-700 hover:text-yellow-25 focus-visible:ring-2 focus-visible:ring-yellow-25 focus-visible:ring-offset-2 focus-visible:ring-offset-richblack-800"
            aria-label="Home"
          >
            <AiOutlineHome
              fontSize={22}
              className={matchRoute("/") ? "text-yellow-25" : ""}
            />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-richblack-100 transition-colors hover:bg-richblack-700 focus-visible:ring-2 focus-visible:ring-yellow-25 focus-visible:ring-offset-2 focus-visible:ring-offset-richblack-800"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <BsXLg fontSize={22} className="text-richblack-100" />
            ) : (
              <AiOutlineMenu fontSize={22} fill="#AFB2BF" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-14 z-[1000] border-b border-richblack-700 bg-richblack-800 px-4 py-4 md:hidden"
          >
          <div className="flex flex-col gap-4">
            {NavbarLinks.map((link) => {
              if (link.title === "Home") return null
              if (link.title === "All Courses" && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return null
              return link.title === "Catalog" ? (
                <div key={link.title} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setMobileCatalogOpen((prev) => !prev)}
                    className="flex items-center justify-between text-left text-sm font-semibold text-richblack-300 hover:text-richblack-5"
                  >
                    {link.title}
                    {mobileCatalogOpen ? (
                      <BsChevronDown className="shrink-0" />
                    ) : (
                      <BsChevronRight className="shrink-0" />
                    )}
                  </button>
                  {mobileCatalogOpen && (
                    <>
                      {loading ? (
                        <p className="pl-2 text-richblack-400">Loading...</p>
                      ) : subLinks?.length ? (
                        <div className="max-h-40 overflow-y-auto rounded border border-richblack-600 bg-richblack-900 pl-2">
                          <div className="flex flex-col gap-1 py-2 pr-2">
                            {subLinks
                              ?.filter((sub) => sub?.courses?.length > 0)
                              ?.map((sub, i) => (
                                <Link
                                  key={i}
                                  to={`/catalog/${sub.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="py-2 text-richblack-5 hover:text-yellow-25"
                                  onClick={() => {
                                    setMobileCatalogOpen(false)
                                    setMobileMenuOpen(false)
                                  }}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <p className="pl-2 text-richblack-400">No courses</p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <Link
                  key={link.title}
                  to={link?.path || "#"}
                  className="text-richblack-5 hover:text-yellow-25"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )
            })}
            {token && user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Link
                to="/dashboard/enrolled-courses"
                className="text-richblack-5 hover:text-yellow-25"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enrolled Courses
              </Link>
            )}
            {token && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/my-courses"
                className="text-richblack-5 hover:text-yellow-25"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Courses
              </Link>
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-richblack-600 pt-4">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="flex items-center gap-2 py-2 text-richblack-5 hover:text-yellow-25"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineShoppingCart className="text-xl" />
                  Cart
                  {totalItems > 0 && (
                    <span className="rounded-full bg-richblack-600 px-2 py-0.5 text-xs text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null && (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-center text-richblack-5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-lg bg-yellow-50 px-4 py-2 text-center font-medium text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
              {token !== null && (
                <>
                  <Link
                    to="/dashboard/my-profile"
                    className="rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-center text-richblack-5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 hover:bg-richblack-600 hover:text-richblack-25"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      dispatch(logout(navigate))
                    }}
                  >
                    <VscSignOut className="text-lg" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
