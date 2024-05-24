import { Button } from "flowbite-react";
import Input from "../../components/input";
import React, { useEffect, useReducer, useState } from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import {
  DiscountHistoryReducer,
  initialDiscountHistory,
} from "../../api/Slices/DiscountHistorySlice/DiscountHistory";
import { postRepresentativeCode } from "../../api/postRepresentativeCode";
import axiosInstance from "../../api/apiConfig";
import { ScaleLoader } from "react-spinners";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubmitButton from "../../components/submitButton";

const ConfirmCode = () => {
  const [uuid, setuuid] = useState("");
  const [open, setOpen] = useState(false);
  const [background, setBackground] = useState("#f5f5f5");
  const [loading, setLoading] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [information, setInformation] = useState<{
    full_name: string;
    phone_number: string;
    min_discount: number;
    max_discount: number;
  }>({
    full_name: "",
    phone_number: "",
    min_discount: 0,
    max_discount: 0,
  });

  const [arraySlider, setArraySlider] = useState<number[]>([]);

  const values: number[] = [];

  const handleArrayToSlide = () => {
    setArraySlider([]);
    for (
      let index = information.min_discount;
      index <= information.max_discount;
      index++
    ) {
      values.push(index);
    }
    setArraySlider(values);
  };

  const [discountState, setDiscountState] = useState<{
    original_price: number;
    discount: number;
    discount_price: number;
  }>({
    original_price: 0,
    discount: 0,
    discount_price: 0,
  });

  useEffect(() => {
    handleArrayToSlide();
    setDiscountState({...discountState, discount: information.max_discount});
  }, [information.min_discount, information.max_discount]);

  const [state, dispatch] = useReducer(
    DiscountHistoryReducer,
    initialDiscountHistory
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "setDiscountCode", payload: { key: name, value } });
  };

  const handleChangediscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setDiscountState({ ...discountState, original_price: +value });
  };

  const settings = {
    className:
      "center h-10 border-solid border border-gray-300 rounded-lg w-52 xs:w-40 !flex items-center justify-center",
    centerMode: true,
    dots: false,
    infinite: false,
    arrows: false,
    centerPadding: "65px",
    color: "#7F38B7",
    slidesToShow: 1,
    slidesToScrool: -1,
    focousOnSelect: true,
    rtl: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 540,
        settings: {
          centerPadding: "50px",
        },
      },
    ],
    beforeChange: (current: number) => {
      setDiscountState({
        ...discountState,
        discount: +`${arraySlider[current]}`,
      });
    },
    afterChange: (current: number) => {
      setDiscountState({
        ...discountState,
        discount: +`${arraySlider[current]}`,
      });
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-[#7F38B7] self-center text-base sm:text-2xl font-semibold">
        لطفاً کد تخفیف را وارد نمایید
      </h1>
      <div className="relative">
        <Input
          Name="representative_code"
          onChange={(e) => {
            handleChange(e);
          }}
          ClassName="w-80 text-base text-center tracking-[1rem] xs:max-w-[15rem] h-14 mx-auto"
          maxLength={8}
        />
      </div>
      <Button
        type="button"
        color="gray"
        className="text-[#7F38B7] bg-gray-100 mt-4 flex items-center justify-center"
        onClick={async () => {
          try {
            setLoading(true);
            const response = await postRepresentativeCode(state.discountCode);
            if (response.uuid) {
              const responseuuid = await axiosInstance.get(
                `discount/${response.uuid}/update/`
              );
              setuuid(response.uuid);
              setInformation(responseuuid.data);
            }

            setTimeout(() => {
              setLoading(false);
              setOpen(true);
            }, 2000);
          } catch (error) {
            setOpen(false);
            setLoading(false);
          }
        }}
      >
        <span className="flex items-center justify-center">
          {loading ? "درحال بررسی" : "بررسی کد تخفیف"}
          {loading ? (
            <ScaleLoader
              color="#7F38B7"
              width={4}
              height={24}
              className="pr-2"
              loading={loading}
            />
          ) : null}
        </span>
      </Button>
      {
        <Dialog
          size="lg"
          open={open}
          handler={setOpen}
          className="!w-auto !max-w-[90%] sm:!min-w-96 bg-transparent shadow-none"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <DialogBody
            className="h-auto w-auto bg-white rounded-2xl p-8 xs:p-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="flex items-center justify-center w-full p-2 py-4">
              <h1 className="text-2xl font-semibold text-[#7F38B7] mr-3">
                مشخصات کاربر
              </h1>
            </div>
            <div className="flex flex-col justify-start w-full px-6 py-4 xs:px-3 xs:py-2 bg-blue-gray-50 rounded-lg">
              <div className="flex gap-1">
                <h2 className="text-[#7F38B7] text-base font-semibold ml-3 xs:ml-1">
                  نام و نام خانوادگی:{" "}
                </h2>
                <span className="xs:flex self-end">
                  {information.full_name}
                </span>
              </div>
              <div className="flex">
                <h2 className="text-[#7F38B7] text-base font-semibold ml-3 xs:ml-1 xs:w-24">
                  شماره تلفن :{" "}
                </h2>
                <span>{information.phone_number}</span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-6">
              <h2 className="text-[#7F38B7] text-base font-semibold w-24">
                قیمت کل{" "}
              </h2>
              <Input
                Name="original_price"
                ClassName="w-full"
                placeholder="325.000 تومان"
                onChange={(e) => {
                  handleChangediscount(e);
                }}
              />
            </div>
            <div className="flex items-center mt-6">
              <h2 className="text-[#7F38B7] text-base font-semibold w-32">
                درصد تخفیف
              </h2>
              <div className="slider-container h-12">
                <Slider {...settings}>
                  {arraySlider.map((item, index) => (
                    <div key={index}>
                      <h3 className="text-center">{item}</h3>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <h2 className="text-[#7F38B7] text-base font-semibold w-32">
                قیمت نهایی:
              </h2>
              <span className="font-bold text-[#303030]">
                {+discountState.original_price -
                  +discountState.original_price *
                    (+discountState.discount / 100)}{" "}
                تومان
              </span>
            </div>
            <div className="flex items-center justify-center mt-6">
              <SubmitButton
                onClick={async () => {
                  try {
                    setLoading(true);
                    const response = await axiosInstance.put(
                      `discount/${uuid}/update/`,
                      {
                        ...discountState,
                        discount_price:
                          +discountState.original_price -
                          +discountState.original_price *
                            (+discountState.discount / 100),
                      }
                    );
                    setBackground("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
                    setTimeout(() => {
                      setLoading(false);
                      setIsValid(true);
                      setShowCross(false);
                    }, 2000);
                    setTimeout(() => {
                      setLoading(false);
                      setIsValid(false);
                      setShowCross(false);
                      setBackground("#f5f5f5");
                    }, 4000);
                    setTimeout(() => {
                      setOpen(false);
                    }, 6000);
                  } catch {
                    setTimeout(() => {
                      setLoading(false);
                      setIsValid(false);
                      setShowCross(true);
                      setBackground("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
                    }, 2000);
                    setTimeout(() => {
                      setLoading(false);
                      setIsValid(false);
                      setShowCross(false);
                      setBackground("#f5f5f5");
                    }, 4000);
                    setTimeout(() => {
                      setOpen(false);
                    }, 6000);
                  }
                }}
                className="!bg-[#f5f5f5] !text-[#7F38B7] text-base font-semibold !w-32"
                loading={loading}
                isValid={isValid}
                showCross={showCross}
                buttonText={"ثبت اطلاعات"}
                buttonBgColor={background}
              />
            </div>
          </DialogBody>
        </Dialog>
      }
    </div>
  );
};

export default ConfirmCode;
