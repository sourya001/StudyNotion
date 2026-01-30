import React from "react"
import { Link } from "react-router-dom"

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]

const Footer = () => {
  return (
    <div className="border-t border-richblack-700 bg-richblack-800">
      <div className="mx-auto flex w-11/12 max-w-maxContent items-center justify-start py-6">
        <div className="flex flex-row gap-0 text-sm text-richblack-400">
          {BottomFooter.map((ele, i) => (
            <div
              key={i}
              className={
                i === 0
                  ? "pr-3"
                  : i === BottomFooter.length - 1
                    ? "border-l border-richblack-600 pl-3"
                    : "border-l border-richblack-600 px-3"
              }
            >
              <Link
                to={ele.split(" ").join("-").toLowerCase()}
                className="cursor-pointer transition-colors hover:text-richblack-50"
              >
                {ele}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
