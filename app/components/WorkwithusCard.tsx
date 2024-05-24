import { Button } from "@material-tailwind/react";
import React from "react";
import LazyImage from "./LazyImage";

interface WorkwithUsCardProps {
  title: string;
  text: string;
  img: string;
  handel: any;
}

const WorkwithUsCard: React.FC<WorkwithUsCardProps> = ({
  text,
  img,
  title,
  handel,
}) => {
  return (
    <div className="flex flex-col  box_shadow rounded-2xl p-4 items-center justify-center md:p-2 bg-[#F5F5F5]">
      <div className="flex flex-col md:flex-row md:items-center">
        <h2 className="font-semibold mt-3 md:my-3 text-lg text-center text-[#303030] ">
          {title}
        </h2>
        <div
          style={{ borderColor: "#717171" }}
          className="flex-1 md:w-48 md:m-3 w-full h-[3px] my-4 border-b-4 border-dotted border-1 mx-1-"
        ></div>
      </div>
      <div className="flex flex-col md:flex-row text-justify px-10 md:px-0">
        <LazyImage
          src={img}
          className=" md:w-36 md:h-36 m-auto lg:p-5"
          alt="img"
          width={144}
          height={144}
        />
        <div className="md:m-2">
          <p className="text-base font-light text-[#303030] text-justify">
            {text}
          </p>
          <Button
            className="bg-[#8754AF] mt-5 w-full"
            placeholder={undefined}
            onClick={handel}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            ثبت درخواست
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkwithUsCard;
