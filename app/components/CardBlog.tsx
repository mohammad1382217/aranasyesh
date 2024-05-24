import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const CardComponentBlog: React.FC<CardBlog> = ({
  text,
  title,
  img,
  date,
  id,
}) => {
  function convertDate(dateString: string) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return dateString;
  }
  return (
    <Card
      className="max-w-64 flex justify-center items-center select-none card-Blog  sm:max-w-64 md:max-w-64 lg:max-w-72 !p-0 touch-none rounded-2xl !gap-0 lg:h-auto !h-80 card cursor-pointer card-Home"
      imgSrc={img}
      imgAlt=""
    >
      <h5 className="text-lg font-normal mr-5 lg:mr-2 tracking-tight text-[#303030] dark:text-white self-start pr-2">
        {title}
      </h5>
      <div className="text-sm flex px-5 lg:px-2 flex-row font-light text-[#303030] text-justify w-full -mt-2">
        <div dangerouslySetInnerHTML={{ __html: text.slice(0, 50) }} />
      </div>
      <div className="w-[90%] sm:w-[90%] md:w-[90%] lg:w-[95%] mx-auto flex items-center p-0 justify-between self-start pr-2">
        <div className="flex">
          <div className="flex">
            <span className="text-base font-extralight text-[#C8C8C8]">
              {convertDate(date)}
            </span>
          </div>
        </div>
        <Link to={`BlogPost/${id}`}>
          <span className="mr-2 text-sm md:text-base font-extralight text-[#C8C8C8]">
            ادامه مطلب
          </span>
        </Link>
      </div>
    </Card>
  );
};
export default CardComponentBlog;

// Types
export interface CardBlog {
  id: number;
  title: string;
  text: string;
  img: string;
  date: string;
}
