import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton: React.FC = () => {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="!w-64 select-none box_shadow justify-start items-center flex flex-col sm:w-64 md:max-w-64 lg:max-w-72 2xl:w-96 2xl:items-center !p-0 rounded-2xl !gap-0 h-64 card cursor-pointer card-Home overflow-hidden flex-shrink-0"
      >
        <div className="w-64 h-36 overflow-hidden !pt-0 !gap-0 -mt-3 select-none box_shadow justify-center items-center flex flex-col sm:w-64 md:max-w-64 lg:max-w-72 2xl:w-96 ">
          <Skeleton height={176} width={288} className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center items-center px-2">
          <h5 className="text-lg text-right w-full font-light tracking-tight text-[#303030] dark:text-white self-start">
            <Skeleton count={2} />
          </h5>
        </div>
      </div>
    ));
};

export default CardSkeleton;
