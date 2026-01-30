import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-base sm:text-xl md:text-4xl font-semibold mx-auto py-4 sm:py-5 pb-12 sm:pb-20 text-center text-white px-2 sm:px-4">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </div>
  )
}

export default Quote