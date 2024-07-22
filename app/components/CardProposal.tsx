import React from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

export interface CardComponentType {
  Id?: string | number;
  text: string;
  img: string;
  rate: string | number;
  offer: string[] | number[];
}

const CardProposal: React.FC<CardComponentType> = ({
  text,
  img,
  rate,
  offer,
  Id,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-60 select-none card  bg-[#FFFFFF] card-Home box_shadow justify-start items-center flex flex-col sm:w-64 md:w-56 lg:w-60 !p-0 rounded-2xl !gap-0 2xl:h-auto h-64 card cursor-pointer card-Home overflow-hidden flex-shrink-0"
      onClick={() => {
        navigate(`/Services/${Id}`);
      }}
    >
      <LazyImage
        src={img}
        className="!h-44"
        alt="subcategory"
        width={283}
        height={176}
      />

      <div className="flex flex-col justify-center items-center !px-3 md:!px-5 lg:!px-4">
        <h2 className="text-lg text-right px-2 w-full font-light tracking-tight text-[#303030] dark:text-white self-start">
          {text}
        </h2>

        <div className="w-full px-2 flex items-start p-0 justify-between self-start mx-auto">
          <div className="flex">
            <span className="text-base font-extralight text-[#717171]">
              امتیاز:
            </span>
            <span className="ml-1 mr-1 text-base font-extralight text-[#717171]">
              {rate}
            </span>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className=" text-sm md:!text-sm font-extralight text-[#717171]">
            <span className="!text-sm lg:text-sm font-extralight text-[#717171]">
              از {offer[0]}
              {"% "}
            </span>
            <span className="!text-sm lg:text-sm font-extralight text-[#717171]">
              تا{" "}
              <span className="text-[#7F38B7]  text-base font-semibold">
                {offer[1]}
                {"% "}
              </span>
              تخفیف{" "}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
export default CardProposal;
