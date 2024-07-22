import React from "react";
import percentage_takhfif from "../assets/svg/percent.svg";
import LazyImage from "./LazyImage";

const CardProfile: React.FC<cardProfileProps> = ({
  name,
  created,
  original_price,
  discount_price,
  percent,
}) => {
  return (
    <div className="w-full rounded-2xl bg-white p-6">
      <div className="pb-4 flex items-center justify-between border-b border-dashed border-[#C8C8C8]">
        <h2 className="text-xl xs:text-base text-[#7F38B7]">{name}</h2>
        <span className="text-xl xs:text-base text-[#7F38B7]">{created}</span>
      </div>
      <div className="pt-6 flex items-center justify-between">
        <div className="absolute">
          <LazyImage
            className="xs:!w-16 sm:!w-16 lg:!w-24 xs:!h-16 sm:!h-16 lg:!h-24"
            src={percentage_takhfif}
            alt="percentage_takhfif"
            width={96}
            height={96}
          />
        </div>
        <div className="relative bottom-0 top-8 font-extrabold text-[#303030] text-xl">
          {percent} % تخفیف
        </div>
        <div className="flex flex-col items-center self-end">
          <span className="text-xl lg:text-3xl font-semibold text-[#C8C8C8] line-through">
            {original_price} تومان
          </span>
          <span className="text-xl lg:text-3xl font-semibold text-[#7F38B7]">
            {discount_price} تومان
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;

// types

interface cardProfileProps {
  name: string;
  created: string;
  original_price: number;
  discount_price: number;
  percent: number;
}
