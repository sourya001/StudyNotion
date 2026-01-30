import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponenet = () => {
  return (
    <div className="bg-richblack-700">
      {/* Stats */}
      <div className="flex flex-col gap-4 sm:gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto px-1 sm:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-4 sm:gap-0">
          {Stats.map((data, index) => {
            return (
              <div className="flex flex-col py-6 sm:py-10" key={index}>
                <h1 className="text-2xl sm:text-[30px] font-bold text-richblack-5">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-sm sm:text-[16px] text-richblack-500">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;
