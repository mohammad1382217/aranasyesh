import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/default-placeholder.webp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export interface CardComponentType {
  cards: any;
}

const CardSkeletonProposal: React.FC<CardComponentType> = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="w-64 select-none card overflow-hidden  bg-[#FFFFFF] card-Home box_shadow justify-start items-center flex flex-col  sm:w-64 md:w-56 lg:w-60 !p-0 rounded-2xl !gap-0 2xl:h-auto h-56 card cursor-pointer card-Home !m-0"
      >
        <div className="!w-72 h-36 overflow-hidden !pt-0 !gap-0 -mt-3 select-none box_shadow justify-center items-center flex flex-col sm:w-64 md:max-w-64 lg:max-w-72 2xl:w-96 ">
          <Skeleton height={150} width={340} className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center items-center px-2">
          <h5 className="text-lg text-right w-full font-light tracking-tight text-[#303030] dark:text-white self-start">
            <Skeleton count={2} />
          </h5>
        </div>
      </div>
    ));
};
export default CardSkeletonProposal;
