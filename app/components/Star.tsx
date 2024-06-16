import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const StarRating = ({
  defaultValue,
  onChange,
  isLoggedIn,
}: {
  defaultValue: number;
  onChange: (value: number) => void;
  isLoggedIn: boolean;
}) => {
  const [value, setValue] = useState(defaultValue || 0);
  const showToastErrorRatingMessage = () => {
    toast.error("به منظور امتیازدهی ابتدا وارد شوید", {
      position: "top-center",
    });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleStarClick = (newValue: number) => {
    if (!isLoggedIn) {
      // اگر کاربر لاگین نبود، اجرای توستیفای مورد نظر
      showToastErrorRatingMessage();
      console.log("User is not logged in. Please log in to rate.");
      return;
    }

    // در غیر این صورت، تغییر مقدار
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-row-reverse">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => handleStarClick(star)}
          className="flex"
          style={{
            width: "20px",
            height: "20px",
            cursor: isLoggedIn ? "pointer" : "default",
            color: star <= value ? "yellow" : "grey",
          }}
        ></FaStar>
      ))}
    </div>
  );
};

export default StarRating;