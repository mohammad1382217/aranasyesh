import React, { useContext, useEffect, useReducer, useState } from "react";
import yaghot from "../assets/svg/yaghot.svg";
import zomorod from "../assets/svg/emerald.svg";
import Firooze from "../assets/svg/cyan-diamond.svg";
import diamond from "../assets/svg/Beautiful-diamond.svg";
import appMobile from "../assets/images/appMobile.webp";
import { SimpleCard } from "../components/simpleCard";
import credit from "../assets/svg/credit-cards-desktop.svg";
import { fetchProduct } from "../api/fetchProduct";
import {
  ProductReducer,
  initialProduct,
} from "../api/Slices/ProductSlice/product";
import {
  Input as MaterialInput,
  Chip,
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { HomeReducer, initialHome } from "../api/Slices/HomeSlice/Home";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/apiConfig";
import axios, { AxiosError, CancelTokenSource } from "axios";
import Input from "../components/input";
import logo from "../assets/svg/logo-orginal.svg";
import { initialLogin, LoginReducer } from "../api/Slices/LoginSlice/Login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuUser2 } from "react-icons/lu";
import { smsStates } from "../components/Header";
import {
  UserContext,
  UserContextType,
} from "../api/Slices/UserSlice/userProvider";
import SubmitButton from "../components/submitButton";
import LazyImage from "../components/LazyImage";

const BuySubscription = () => {
  const User = useContext(UserContext);
  const { account, isLoggedIn, setIsLoggedIn } = User as UserContextType;
  const [ProductState, dispatchProduct] = useReducer(
    ProductReducer,
    initialProduct
  );
  const [HomeState, dispatchHome] = useReducer(HomeReducer, initialHome);
  const [isSendSms, setisSendSms] = React.useState(false);
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const secondInputRef = React.useRef<HTMLInputElement>(null);
  const thirdInputRef = React.useRef<HTMLInputElement>(null);
  const fourthInputRef = React.useRef<HTMLInputElement>(null);
  const fifthInputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [LoginState, dispatchLogin] = useReducer(LoginReducer, initialLogin);
  const [ZARINPAL, setZARINPAL] = useState({
    url: "",
    uuid: "",
  });

  const [showCross, setShowCross] = useState(false);
  const [background, setBackground] = useState("#8754AF");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatchLogin({ type: "setCode", payload: { key: name, value } });

    const { code } = LoginState;

    if (code.code1 && code.code2 && code.code3 && code.code4 && code.code5) {
      dispatchLogin({ type: "setOtp" });
    }
  };

  const showModalLogin = () => {
    dispatchHome({
      type: "setIsShowModalLogin",
      payload: !HomeState.isShowModalHandler,
    });
  };

  const showToastMessage = () => {
    toast.success("با موفقیت وارد شدید", {
      position: "top-center",
    });
  };

  const showToastErrorMessage = () => {
    toast.error("خطایی رخ داده است مجددا تلاش کنید", {
      position: "top-center",
    });
  };

  const [loading, setLoading] = useState(false);

  const handlepostPhoneNumber = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "account/",
        LoginState.PhoneNumber
      );
      setLoading(false);
      setIsValid(true);
      setShowCross(false);
      setBackground("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
      setTimeout(() => {
        setLoading(false);
        setIsValid(false);
        setShowCross(false);
        setBackground("#8754AF");
      }, 1500);
      setisSendSms(true);
    } catch {
      setLoading(false);
      setIsValid(false);
      setShowCross(true);
      setBackground("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
      setTimeout(() => {
        setLoading(false);
        setIsValid(false);
        setShowCross(false);
        setBackground("#8754AF");
      }, 1500);
      setisSendSms(false);
    } finally {
      setLoading(false);
    }
  };

  const [loadingSms, setLoadingSms] = useState(false);
  const handlePostOtpValid = async (): Promise<void> => {
    const validateOtp = (otp: string): boolean => {
      return otp.length === 5;
    };

    setError(
      !validateOtp(LoginState.smsStates.otp) ||
        !validateOtp(LoginState.smsStatesOTP.otp)
    );

    const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();

    const loginUser = async (loginState: smsStates): Promise<boolean> => {
      setLoadingSms(true);
      try {
        const response = await axiosInstance.post(
          "account/otp-valid/",
          loginState,
          {
            cancelToken: cancelTokenSource.token,
          }
        );
        const data = response.data;
        localStorage.setItem("accessToken", JSON.stringify(data));
        return true;
      } catch (error) {
        if (axios.isCancel(error as AxiosError)) {
          console.log("Request canceled by cleanup");
        }
        return false;
      } finally {
        setLoadingSms(false);
      }
    };

    let isLoggedIn: boolean = false;

    if (LoginState.smsStates.customer_code === "") {
      isLoggedIn = await loginUser(LoginState.smsStatesOTP);
    } else {
      isLoggedIn = await loginUser(LoginState.smsStates);
    }

    setIsLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      showModalLogin();
      navigate("/ProfileOne");
      showToastMessage();
    } else {
      showModalLogin();
      showToastErrorMessage();
    }
  };

  const handleInputFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    if (value.length === 1 && /^[0-9a-zA-Z]*$/.test(value)) {
      const form = target.form;
      if (form) {
        const inputs = Array.from(form.elements) as HTMLInputElement[];
        const index = inputs.indexOf(target);
        if (index !== -1 && index < inputs.length - 1) {
          const nextElement = inputs[index + 1];
          if (nextElement) {
            nextElement.focus();
          }
        }
      }
    } else if (value.length === 0 && e.key === "Backspace") {
      const form = target.form;
      if (form) {
        const inputs = Array.from(form.elements) as HTMLInputElement[];
        const index = inputs.indexOf(target);
        if (index !== -1 && index > 0) {
          const previousElement = inputs[index - 1];
          if (previousElement) {
            previousElement.focus();
          }
        }
      }
    }
  };

  useEffect(() => {
    const cleanupBuy = fetchProduct(dispatchProduct);
    return cleanupBuy;
  }, []);

  const handleClickButton = async (id: number) => {
    let cancelTokenSource: CancelTokenSource | null = null;

    try {
      cancelTokenSource = axios.CancelToken.source();
    } catch (error) {
      // Handle error if cancel token creation fails
      console.error("Failed to create cancel token:", error);
    }

    const fetchData = async () => {
      if (!cancelTokenSource) return; // Exit if cancel token is null
      try {
        const response = await axiosInstance.get(
          `product/transaction/${id}/buy/`,
          {
            cancelToken: cancelTokenSource.token,
          }
        );
        const data = response.data;
        console.log(data);
        localStorage.setItem("ZARINPAL", data.uuid);
        setZARINPAL(data);
        window.location.replace(data.url);
      } catch (error) {
        if (axios.isCancel(error as AxiosError)) {
          console.log("Request canceled by cleanup");
        } else {
          // Handle error if it's not a cancellation error
          const errorMessage = (error as Error).message; // Type assertion
          console.log(errorMessage);
        }
      }
    };

    fetchData(); // Start fetching immediately

    // Return cleanup function
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled by cleanup");
      }
    };
  };

  return (
    <section className="w-full h-full flex items-center bg-[#F5F5F5]">
      <div className="container w-full flex flex-col items-center justify-between mx-auto my-10">
        <section className="flex flex-col items-center md:!flex-row-reverse p-7 xs:w-10/12 lg:w-11/12 bg-[#FFFFFF] rounded-2xl gap-8">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center xl:justify-start gap-20">
            <div className="flex flex-col">
              <h1 className="text-[#7F38B7] self-center xl:self-start text-xl sm:text-3xl font-semibold pt-6">
                خرید اشتراک تخفیف کارت
              </h1>
              <div className="py-4">
                <div className="text-base font-light text-[#303030] text-justify mb-6">
                  همه می‌دانیم که خرید خوب و با کیفیت به همراه تخفیف بسیار
                  لذت‌بخش‌تر است.{" "}
                  <span className="text-[#7F38B7]">تخفیف کارت آران آسایش</span>{" "}
                  با تعداد زیادی از بهترین مجموعه‌ها و برندها از مشاغل گوناگون
                  در نقاط مختلف کشور عزیزمان وارد مذاکره شده و قراردادهایی را
                  امضا کرده است.
                </div>
                <p className="text-base font-light text-[#303030] text-justify">
                  محصول تیم خلاق آران آسایش آفرینان یعنی کارت تخفیف آران آسایش،
                  حامی اقتصاد خانوار بوده و تلاش شده تا یک مجموعه جامع و یکپارچه
                  از محصولات و خدمات متنوع حوزه‌های سلامت، تفریحی، رفاهی و خماتی
                  در آن گنجانده شود تا خریداران محترم بتوانید با آسودگی خیال و
                  اعتماد کامل از این سامانه که متعلق به خودتان است بهره‌مند
                  شوید.
                </p>
                <p className="text-base font-light text-[#303030] text-justify mt-6 ">
                  شما میتوانید با استفاده از شماره کارت یا شبای موجود، هزینه را
                  برایمان واریز کنید و بعد از واریز با شماره های موجود تماس
                  گرفته تا اشتراک شما برایتان فعال شود.
                </p>
                <span className="block mt-3">IR11 0120 0000 0000 8937 5738 84</span>
                <span className="block mb-3 text-right" dir="ltr">
                  6104 3373 9653 2184
                </span>
                <span>محمد رضا مرادی</span>
                <span className="block mt-2">
                  09100960018
                  <br></br>
                  02536621400
                </span>
              </div>
            </div>
            <LazyImage src={credit} alt="credit" width={undefined} height={undefined} />
          </div>
        </section>
        <section className="w-full flex items-center justify-between">
          {ProductState.product.map((product) =>
            product.name === "الماس" ? (
              <SimpleCard
                key={product.id}
                header={
                  <span className="flex justify-between relative">
                    <div className="flex flex-col self-start !items-start">
                      <h2 className="xs:text-3xl text-4xl text-[#C5C1FF] mb-6">
                        اشتراک {product?.name}
                      </h2>{" "}
                      <h4 className="xs:text-xl text-2xl mb-10">
                        با یک تیر، چند نشان بزنید!
                      </h4>
                    </div>
                    <h2 className="roboto-regular-italic text-9xl text-[#C5C1FF] absolute right-72 xl:right-[34rem] -top-3 hidden lg:block opacity-20">
                      Diamond
                    </h2>
                  </span>
                }
                text={
                  <span className="text-base font-light text-white text-justify">
                    {product?.description}
                  </span>
                }
                Image={diamond}
                ImageClass="w-32 -top-[2.75rem] left-0 z-50 xl:w-52 xl:-top-[4rem]"
                cardClass="w-full min-h-[431px] bg-gradient-to-r from-[#19177C] to-[#463CB9] pt-10 container mx-auto flex flex-col items-center justify-between p-7 xs:w-10/12 lg:w-11/12 rounded-2xl gap-8"
                price={`${product?.price?.toLocaleString("fa-IR")} تومان`}
                Button={
                  <Button
                    className="bg-white text-[#8754AF] text-2xl py-2"
                    onClick={() => {
                      JSON.parse(localStorage.getItem("accessToken")!)?.token
                        ? handleClickButton(product?.id)
                        : showModalLogin();
                    }}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    disabled={
                      isLoggedIn
                        ? account.results[0].subscription.is_buy
                          ? account.results[0].subscription.name !== ""
                            ? true
                            : false
                          : false
                        : false
                    }
                  >
                    {isLoggedIn
                      ? account.results[0].subscription.is_buy
                        ? account.results[0].subscription.name !== ""
                          ? "شما اشتراک دارید"
                          : "خرید اشتراک"
                        : "خرید اشتراک"
                      : "جهت خرید ابتدا وارد شوید"}
                  </Button>
                }
              />
            ) : null
          )}
        </section>
        <section className="w-full flex flex-col xl:flex-row items-center justify-between gap-4 xs:w-10/12 lg:w-11/12">
          <div className="w-full flex flex-col-reverse xl:grid xl:grid-cols-3 xl:gap-3 items-center justify-between">
            {ProductState.product.map((product) =>
              product.name === "یاقوت" ? (
                <SimpleCard
                  key={product.id}
                  header={`اشتراک ${product?.name}`}
                  headerClass="text-[#FFCEDA] xs:text-3xl text-4xl"
                  text={
                    <div className="text-base font-light text-white text-justify">
                      {product?.description}
                    </div>
                  }
                  Image={yaghot}
                  ImageClass="w-32 -top-[3.5rem] lg:-top-[2.75rem] left-0 z-50"
                  cardClass="w-full min-h-[418px] flex flex-col items-center justify-between justify-between bg-gradient-to-r from-red-900 to-red-600"
                  price={`${product?.price?.toLocaleString("fa-IR")} تومان`}
                  Button={
                    <Button
                      className="bg-white text-[#8754AF] text-2xl py-2"
                      onClick={() => {
                        JSON.parse(localStorage.getItem("accessToken")!)?.token
                          ? handleClickButton(product?.id)
                          : showModalLogin();
                      }}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      disabled={
                        true
                        //   account!.results[0].subscription.is_buy ?  true : false
                      }
                    >
                      {isLoggedIn ? "بزودی" : "ابتدا وارد شوید"}
                    </Button>
                  }
                />
              ) : null
            )}
            {ProductState.product.map((product) =>
              product.name === "فیروزه" ? (
                <SimpleCard
                  key={product.id}
                  header={`اشتراک ${product?.name}`}
                  headerClass="text-[#C7FCFF] xs:text-3xl text-4xl"
                  text={
                    <div className="text-base font-light text-white text-justify">
                      {product?.description}
                    </div>
                  }
                  Image={Firooze}
                  ImageClass="w-32 -top-[2.5rem] left-0 z-50"
                  cardClass="w-full min-h-[418px] flex flex-col items-center justify-between justify-between bg-gradient-to-r from-cyan-900 to-cyan-600"
                  price={`${product?.price?.toLocaleString("fa-IR")} تومان`}
                  Button={
                    <Button
                      className="bg-white text-[#8754AF] text-2xl py-2"
                      onClick={() => {
                        JSON.parse(localStorage.getItem("accessToken")!)?.token
                          ? handleClickButton(product?.id)
                          : showModalLogin();
                      }}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      disabled={
                        true
                        //   account!.results[0].subscription.is_buy ?  true : false
                      }
                    >
                      {isLoggedIn ? "بزودی" : "ابتدا وارد شوید"}
                    </Button>
                  }
                />
              ) : null
            )}
            {ProductState.product.map((product) =>
              product.name === "زمرد" ? (
                <SimpleCard
                  key={product.id}
                  header={`اشتراک ${product?.name}`}
                  headerClass="text-[#BDFFDB] xs:text-3xl text-4xl"
                  text={
                    <div className="text-base font-light text-white text-justify">
                      {product?.description}
                    </div>
                  }
                  Image={zomorod}
                  ImageClass="w-32 -top-[3.5rem] lg:-top-[3rem] left-0 z-50"
                  cardClass="w-full min-h-[418px] flex flex-col items-center justify-between justify-between bg-gradient-to-r from-green-900 to-green-600"
                  price={`${product?.price?.toLocaleString("fa-IR")} تومان`}
                  Button={
                    <Button
                      className="bg-white text-[#8754AF] text-2xl py-2"
                      onClick={() => {
                        JSON.parse(localStorage.getItem("accessToken")!)?.token
                          ? handleClickButton(product?.id)
                          : showModalLogin();
                      }}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      disabled={
                        isLoggedIn
                          ? account.results[0].subscription.is_buy
                            ? account.results[0].subscription.name !== ""
                              ? true
                              : false
                            : false
                          : false
                      }
                    >
                      {isLoggedIn
                        ? account.results[0].subscription.is_buy
                          ? account.results[0].subscription.name !== ""
                            ? "شما اشتراک دارید"
                            : "خرید اشتراک"
                          : "خرید اشتراک"
                        : "ابتدا وارد شوید"}
                    </Button>
                  }
                />
              ) : null
            )}
          </div>
        </section>
        <section className="container mx-auto my-10 flex flex-col items-center md:!flex-row-reverse xs:p-4 p-10 xs:w-10/12 lg:w-11/12 bg-white rounded-2xl gap-8">
          <div className="w-full flex flex-col items-center justify-between">
            <div className="flex items-center justify-center">
              <section className="flex flex-col">
                <h1 className="self-center md:self-start text-3xl sm:text-4xl font-semibold">
                  نحوه استفاده از اشتراک تخفیف آران آسایش
                </h1>
                <p className="text-base font-light text-[#303030] text-justify pt-8 pb-10">
                  محصول تیم خلاق آران آسایش آفرینان یعنی کارت تخفیف آران آسایش،
                  حامی اقتصاد خانوار بوده و تلاش شده تا یک مجموعه جامع و یکپارچه
                  از محصولات و خدمات متنوع حوزه‌های سلامت، تفریحی، رفاهی و خماتی
                  در آن گنجانده شود تا خریداران محترم بتوانید با آسودگی خیال و
                  اعتماد کامل از این سامانه که متعلق به خودتان است بهره‌مند
                  شوید.
                </p>
              </section>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <section className="flex flex-col">
                <Chip
                  className="text-[#8754AF] border-none bg-[#F5F5F5] text-2xl !w-32 mb-4"
                  variant="outlined"
                  value="قدم یکم"
                />
                <p className="text-base font-light text-[#303030] text-justify mb-4">
                  ابتدا نرم‌افزار آران آسایش را از اینجا دانلود کرده و سپس طبق
                  تصویر، وارد پنل کاربری خود شوید.
                </p>
                <LazyImage src={appMobile} alt="appMobile" width={305} height={323} />
              </section>
              <section className="flex flex-col">
                <Chip
                  className="text-[#8754AF] border-none bg-[#F5F5F5] text-2xl !w-32 mb-4"
                  variant="outlined"
                  value="قدم دوم"
                />
                <p className="text-base font-light text-[#303030] text-justify mb-4">
                  ابتدا نرم‌افزار آران آسایش را از اینجا دانلود کرده و سپس طبق
                  تصویر، وارد پنل کاربری خود شوید.
                </p>
                <LazyImage src={appMobile} alt="appMobile" width={305} height={323} />
              </section>
              <section className="flex flex-col">
                <Chip
                  className="text-[#8754AF] border-none bg-[#F5F5F5] text-2xl !w-32 mb-4"
                  variant="outlined"
                  value="قدم سوم"
                />
                <p className="text-base font-light text-[#303030] text-justify mb-4">
                  ابتدا نرم‌افزار آران آسایش را از اینجا دانلود کرده و سپس طبق
                  تصویر، وارد پنل کاربری خود شوید.
                </p>
                <LazyImage src={appMobile} alt={appMobile} width={305} height={323} />
              </section>
            </div>
          </div>
        </section>
      </div>
      <Dialog
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        open={HomeState.isShowModalHandler}
        handler={showModalLogin}
        className="!w-auto !max-w-[90%] sm:!min-w-96"
      >
        <DialogBody
          className="h-auto w-auto"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center justify-center w-full p-2 py-4">
            <LazyImage src={logo} className="w-14 h-auto" alt="" width={56} height={56} />
            <h1 className="text-2xl font-semibold text-[#8754AF] mr-3">
              آران آسایش
            </h1>
          </div>
          <div className="flex-1 border-[#ECECEC] border-t-2"></div>
          {isSendSms === false ? (
            <div className="px-10 mt-5">
              <div className="flex p-3">
                <LuUser2 color="#8754AF" size={26} />
                <span className="text-[#8754AF] text-xl font-semibold mr-2">
                  ورود یا ثبت‌نام
                </span>
              </div>
              <h2 className="text-base font-light text-[#717171] py-2">
                لطفاً شماره همراه خود را وارد نمایید
              </h2>
              <Input
                Name="phone_number"
                sizing="md"
                type="text"
                ClassName="w-full"
                placeholder="شماره همراه"
                autofocus
                onChange={(e) => {
                  dispatchLogin({
                    type: "setPhoneNumber",
                    payload: { key: e.target.name, value: e.target.value },
                  });
                  dispatchLogin({
                    type: "setsmsStatesOTP",
                    payload: { key: e.target.name, value: e.target.value },
                  });
                  dispatchLogin({
                    type: "setsmsStates",
                    payload: { key: e.target.name, value: e.target.value },
                  });
                }}
              />
              <SubmitButton
                loading={loading}
                isValid={isValid}
                buttonText={"ادامه"}
                showCross={showCross}
                buttonBgColor={background}
                onClick={handlepostPhoneNumber}
                // onKeyUp={handleKeyDown}
              />
            </div>
          ) : (
            <div className="px-6 md:px-10 mt-5 h-auto">
              <div className="flex p-3">
                <LuUser2 color="#8754AF" size={26} />
                <span className="text-[#8754AF] text-xl font-semibold mr-2">
                  ورود یا ثبت‌نام
                </span>
              </div>
              <h2 className="text-base font-light text-[#717171] p-2">
                کد پیامک شده را وارد نمایید
              </h2>
              <form className="flex items-center flex-row-reverse justify-between mb-4 w-full">
                <MaterialInput
                  maxLength={1}
                  dir="ltr"
                  name="code1"
                  size="md"
                  autoFocus
                  className="text-center !w-10 !border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8]  placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{
                    className: "inline-flex w-auto min-w-[40px] !w-[40px]",
                  }}
                  crossOrigin={undefined}
                  onKeyUp={handleInputFocus}
                  ref={firstInputRef}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <MaterialInput
                  maxLength={1}
                  dir="ltr"
                  size="md"
                  name="code2"
                  className="text-center !w-10 !border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8]  placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{
                    className: "inline-flex w-auto min-w-[40px] !w-[40px]",
                  }}
                  crossOrigin={undefined}
                  onKeyUp={handleInputFocus}
                  ref={secondInputRef}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <MaterialInput
                  maxLength={1}
                  dir="ltr"
                  size="md"
                  name="code3"
                  className="text-center !w-10 !border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8]  placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{
                    className: "inline-flex w-auto min-w-[40px] !w-[40px]",
                  }}
                  crossOrigin={undefined}
                  onKeyUp={handleInputFocus}
                  ref={thirdInputRef}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <MaterialInput
                  maxLength={1}
                  dir="ltr"
                  name="code4"
                  size="md"
                  className="text-center !w-10 !border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8]  placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{
                    className: "inline-flex w-auto min-w-[40px] !w-[40px]",
                  }}
                  crossOrigin={undefined}
                  onKeyUp={handleInputFocus}
                  ref={fourthInputRef}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <MaterialInput
                  maxLength={1}
                  dir="ltr"
                  name="code5"
                  size="md"
                  className="text-center -ml-10 !w-10 !border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8]  placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{
                    className: "inline-flex w-auto min-w-[40px] !w-[40px]",
                  }}
                  crossOrigin={undefined}
                  onKeyUp={handleInputFocus}
                  ref={fifthInputRef}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onChange={(e) => {
                    handleChange(e);
                    dispatchLogin({
                      type: "setOtp",
                    });
                  }}
                />
              </form>
              <Input
                Name="customer_code"
                sizing="md"
                type="text"
                ClassName="w-full"
                placeholder="کد معرف"
                onChange={(e) => {
                  dispatchLogin({
                    type: "setsmsStates",
                    payload: { key: e.target.name, value: e.target.value },
                  });
                }}
              />
              {error ? (
                <div className="text-red-500 text-sm p-1">
                  {"لطفا کد پیامکی را کامل وارد کنید"}
                </div>
              ) : null}
              <SubmitButton
                loading={loadingSms}
                isValid={isValid}
                buttonText={"ورود"}
                showCross={showCross}
                buttonBgColor={background}
                onClick={handlePostOtpValid}
                // onKeyUp={handleKeyDown}
              />
            </div>
          )}

          <Button
            className="bg-[#ECECEC] w-full mt-3 rounded-t-none button-fix py-3 !absolute bottom-0 right-0 text-[#717171] text-base font-light"
            onClick={() => {
              isSendSms === false ? showModalLogin() : setisSendSms(false);
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            بازگشت {">"}
          </Button>
        </DialogBody>
      </Dialog>
    </section>
  );
};

export default BuySubscription;
