import React from "react";
import { CgSpinner } from "react-icons/cg";
import { MdDone } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

interface SubmitButtonProps {
  className?: string;
  loading: boolean;
  isValid: boolean;
  showCross: boolean;
  buttonText: string; // متن دکمه
  buttonBgColor: string; // رنگ بک‌گراند دکمه
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  className,
  loading,
  isValid,
  showCross,
  buttonText,
  buttonBgColor,
  onClick,
  onKeyUp,
}) => {
  return (
    <button
      type="submit"
      disabled={loading && isValid && showCross ? true : false}
      className={`outline-none h-10 w-full flex justify-center items-center rounded-lg font-bold text-sm text-white tracking-wide cursor-pointer transition-all ease-in-out hover:bg-[#8b4bbd] ${
        loading ? "duration-1000" : ""
      } mt-3 text-xs ${className} ${`!bg-[${buttonBgColor}]`}`}
      style={{ backgroundColor: buttonBgColor }} // استفاده از رنگ بک‌گراند از پراپ
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      {loading ? (
        <div className="flex items-center justify-center ml-2">
          <CgSpinner className="w-6 h-6 border-gray-400 border-3 font-extralight animate-spin" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {isValid && !showCross && (
            <MdDone className="w-6 h-6 text-green-200" />
            
          )}
          {!isValid && showCross && (
            <FaTimes className="w-6 h-6 text-red-200" />
          )}
        </div>
      )}
      {/* نمایش متن دکمه */}
      {buttonText}
    </button>
  );
};

export default SubmitButton;
