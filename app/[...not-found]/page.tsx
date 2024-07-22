import React from "react";
import img404 from "../assets/images/404.webp";
import Button from "@material-tailwind/react/components/Button";
import { NavLink } from "react-router-dom/dist";
const LazyImage = React.lazy(() => import("../components/LazyImage"));

const Page404 = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#F5F5F5] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-11/12 scale-75 md:scale-90">
        <LazyImage
          className="!aspect-square"
          src={img404}
          alt="404"
          width={419}
          height={419}
        />
        <span className="text-sm sm:text-2xl font-light text-[#7F38B7] mt-4">
          «متاسفانه صفحه مورد نظر شما پیدا نشد»
        </span>
        <NavLink to={"/"}>
          <Button
            className="bg-[#8754AF] mt-3 self-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            بازگشت به صفحه اصلی
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Page404;
