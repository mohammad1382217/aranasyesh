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

const CardComponent: React.FC<CardComponentType> = ({
  text,
  img,
  rate,
  offer,
  Id,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-64 select-none box_shadow justify-start items-center flex flex-col sm:w-64 md:max-w-64 lg:max-w-72 2xl:w-96 2xl:items-center !p-0 rounded-2xl !gap-0 h-64 card cursor-pointer card-Home overflow-hidden flex-shrink-0"
      onClick={() => {
        navigate(`/Services/${Id}`);
      }}
    >
      <LazyImage
        src={img}
        className="!h-44"
        loading="lazy"
        alt="Card-Image"
        width={283}
        height={176}
      />

      <div className="flex flex-col justify-center items-center px-2">
        <h2 className="text-base text-right px-2 w-full font-light tracking-tight text-[#303030] dark:text-white self-start">
          {text}
        </h2>

        <div className="w-full px-2 flex items-start p-0 justify-between self-start mx-auto">
          <div className="flex">
            <span className="text-base font-extralight text-[#4A4A4A]">
              امتیاز:
            </span>
            <span className="ml-1 mr-1 text-base font-extralight text-[#4A4A4A]">
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
          <p role="text" lang="fa" className="!text-sm lg:text-sm font-extralight text-[#4A4A4A]">
            از {offer[0]}
            {"% "}
            تا{" "}
            <span className="text-[#7F38B7] text-base font-semibold">
              {offer[1]}
              {"% "}
            </span>
            تخفیف{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CardComponent;
