import React from "react";
import { Link } from "react-router-dom/dist";

const LineSpace: React.FC<LineSpaceProps> = ({
  text,
  icon,
  ClassName,
  color,
  link,
  showMore,
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center mt-10 ${ClassName}`}
      style={{ color: color }}
    >
      {icon}
      <span
        className={`sm:mx-2 mr-2 text-sm sm:text-lg font-semibold text-[#4A4A4A]`}
      >
        {text}
      </span>
      {showMore ? (
        <>
          <div
            style={{ borderColor: color }}
            className="flex-1 md:border-b-4 md:border-dotted md:border-3 sm:mx-3"
          ></div>
          <Link to={link}>
            <button className="text-sm sm:text-lg font-thin text-[#4A4A4A]">
              {" "}
              مشاهده بیشتر <span className="mr-2">&gt;</span>
            </button>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default LineSpace;

// Types
interface LineSpaceProps {
  text: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  showMore?: boolean;
  ClassName?: string;
}
