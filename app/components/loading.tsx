import React from "react";
import displayloading from "../assets/images/loading.webp";
import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="sweet-loading w-[100vw] h-[100vh] bg-[#F5F5F5] fixed top-0 left-0 z-50 flex flex-col justify-center items-center select-none">
      <div className="flex flex-col gap-5 justify-center items-center xs:max-w-[300px]">
        <div className="flex items-center justify-center">
          <CgSpinner color="#7d52ab" className="w-32 h-32 font-extralight animate-spin" />
        </div>
        <img src={displayloading} alt="loading" width={419} height={172} />
      </div>
    </div>
  );
};

export default Loading;