import React, { lazy, useEffect, useReducer, useState } from "react";
import Input from "../components/input";
import map from "../assets/images/map.webp";
import sms from "../assets/svg/sms.svg";
import call from "../assets/svg/call.svg";
import eitaa from "../assets/svg/eitaa.svg";
import workwithus from "../assets/images/workwithus.webp";
import laptop from "../assets/images/MacBook Pro 16.webp";
import WorkwithUsCard from "../components/WorkwithusCard";
import telegram from "../assets/svg/telegram.svg";
import whatsapp from "../assets/svg/whatsapp.svg";
import instegram from "../assets/svg/instagram.svg";
import phone from "../assets/images/Samsung Galaxy Z Fold 3.webp";
import Dialog from "@material-tailwind/react/components/Dialog";
import DialogBody from "@material-tailwind/react/components/Dialog/DialogBody";
import {
  initialWorkwithus,
  WorkwithusReducer,
} from "../api/Slices/WorkwithusSlice/Workwithus";
import SubmitButton from "../components/submitButton";
import axiosInstance, { getCookie } from "../api/apiConfig";
import axios, { AxiosError, CancelTokenSource } from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const TextArea = lazy(()=> import("../components/TextArea"));
const LazyImage = React.lazy(() => import("../components/LazyImage"));

const WorkWithUs = () => {
  const [openApp, SetopenApp] = useState(false);
  const [openSite, SetopenSite] = useState(false);
  const [CompanyWorkwithus, dispatchCompanyWorkwithus] = useReducer(
    WorkwithusReducer,
    initialWorkwithus
  );

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showCross, setshowCross] = useState(false);
  const [buttonText, setbuttonText] = useState("ثبت درخواست");
  const [backgroundColor, setBackgroundColor] = useState("#8754AF");

  useEffect(() => {
    // console.log(CompanyWorkwithus);
    if (CompanyWorkwithus.error.RequestApp.name.length > 0) {
      CompanyWorkwithus.error.RequestApp.name.map((e: string) => {
        toast.error(`نام و نام خانوادگی: ${e}`);
      });
    }
    if (CompanyWorkwithus.error.RequestApp.phone.length > 0) {
      CompanyWorkwithus.error.RequestApp.phone.map((e: string) => {
        toast.error(`شماره: ${e}`);
      });
    }
  }, [CompanyWorkwithus, dispatchCompanyWorkwithus]);

  const showToastErrorMessage = () => {
    toast.error("برای ثبت درخواست ابتدا وارد شوید", {
      position: "top-center",
    });
  };

  const handelModalSite = () => {
    if (getCookie("accessToken") ) {
      SetopenSite(!openSite);
    } else {
      showToastErrorMessage();
    }
  };

  const handelModalApp = () => {
    if (getCookie("accessToken") ) {
      SetopenApp(!openApp);
    } else {
      showToastErrorMessage();
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#F5F5F5] gap-10 overflow-hidden">
      <section className="container mx-auto mt-10 flex flex-col items-center md:!flex-row-reverse p-7 w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-8">
        <LazyImage
          src={workwithus}
          className="w-full h-[162px] bg-cover object-fill bg-no-repeat"
          alt="workwithus"
          width={280}
          height={162}
        />
        <div className="w-full flex flex-col justify-center lg:justify-start items-start text-justify gap-8 md:gap-6">
          <h1
            id="services"
            className="text-[#7F38B7] self-center md:self-start text-3xl sm:text-4xl font-semibold"
          >
            همکاری با ما
          </h1>
          <ol
            className="flex flex-col pr-4 gap-3 md:gap-5 md:pr-6"
            style={{ listStyle: "arabic-indic" }}
          >
            <li>
              با عضویت در مجموعه آران آسایش آفرینان،{" "}
              <strong className="text-[#7F38B7]">
                با یک تیر چند نشان بزنید!
              </strong>
            </li>
            <li>
              از خدمات تبلیغاتی ما در سایت و اپلیکیشن بهره برده و شناخته شوید.
            </li>
            <li>
              در لیست مجموعه‌های آران آسایش قرار گرفته و مشتریان خود را افزایش
              دهید.
            </li>
            <li>افزایش درآمد در ادامه فروش بیشتر به خریداران ثابت است!</li>
            <li>استفاده از دیگر خدمات متنوع مجموعه آران آسایش آفرینان</li>
          </ol>
        </div>
      </section>
      <section className="container mx-auto flex flex-col py-7 px-5 md:px-14 w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-4">
        <h2
          id="subset"
          className="font-semibold text-xl text-center text-[#303030] md:self-start md:p-3"
        >
          فرم درخواست پیوستن به زیرمجموعه آران آسایش{" "}
        </h2>
        <p lang="fa" className="text-base font-light text-[#303030] text-justify">
          جهت ثبت مجموعه خود و استفاده از امکانات گروه آران آسایش برای افزایش
          بهره‌وری تبلیغاتی و درآمدی، اطلاعات دقیق مجموعه خود را جهت بررسی، در
          فرم زیر وارد کرده و پس از ثبت اطلاعات، منتظر تماس کارشناسان ما باشید.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <Input
            sizing="md"
            type="text"
            Name="company_name"
            ClassName="w-full"
            value={CompanyWorkwithus.RequestComapny.company_name}
            onChange={(e) => {
              dispatchCompanyWorkwithus({
                type: "setRequestComapny",
                payload: { key: e.target.name, value: e.target.value },
              });
            }}
            placeholder="نام مجموعه/نام شخص *"
          />
          <Input
            sizing="md"
            type="text"
            Name="phone_number"
            value={CompanyWorkwithus.RequestComapny.phone_number}
            ClassName="w-full"
            placeholder="شماره تماس مجموعه *"
            onChange={(e) => {
              dispatchCompanyWorkwithus({
                type: "setRequestComapny",
                payload: { key: e.target.name, value: e.target.value },
              });
            }}
          />
          <Input
            sizing="md"
            type="text"
            Name="call_number"
            ClassName="w-full"
            value={CompanyWorkwithus.RequestComapny.call_number}
            // pattern="[0-9]{11}"
            placeholder="شماره موبایل *"
            pattern="[0-9]{11}"
            title="لطفا یک شماره موبایل معتبر وارد کنید"
            onChange={(e) => {
              dispatchCompanyWorkwithus({
                type: "setRequestComapny",
                payload: { key: e.target.name, value: e.target.value },
              });
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <TextArea
            Name="address"
            placeholder="آدرس مجموعه *"
            TextAreaClass={"!h-20 md:!h-36"}
            Value={CompanyWorkwithus.RequestComapny.address}
            onChange={(e) => {
              dispatchCompanyWorkwithus({
                type: "setRequestComapny",
                payload: { key: e.target.name, value: e.target.value },
              });
            }}
          />
          <TextArea
            Name="description"
            placeholder="توضیحات مجموعه"
            Value={CompanyWorkwithus.RequestComapny.description}
            TextAreaClass={"!h-20 md:!h-36"}
            onChange={(e) => {
              dispatchCompanyWorkwithus({
                type: "setRequestComapny",
                payload: { key: e.target.name, value: e.target.value },
              });
            }}
          />
        </div>

        <SubmitButton
          className="h-11 text-base flex items-center shadow-none  text-gray-700  max-sm:!px-4 w-max self-end px-8 py-2.5"
          loading={loading}
          isValid={isValid}
          showCross={showCross}
          buttonBgColor={backgroundColor}
          buttonText={buttonText}
          onClick={async () => {
            if (getCookie("accessToken") ) {
              setLoading(true);
              setbuttonText("درحال درخواست");

              let cancelTokenSource: CancelTokenSource | null = null;
              try {
                cancelTokenSource = axios.CancelToken.source();
              } catch (error) {
                // Handle error if cancel token creation fails
                console.error("Failed to create cancel token:", error);
              }

              if (!cancelTokenSource) return;
              try {
                const response = await axiosInstance.post(
                  "request/company/",
                  CompanyWorkwithus.RequestComapny,
                  {
                    cancelToken: cancelTokenSource.token,
                  }
                );
                const data = response.data;
                setLoading(false);
                setIsValid(true);
                setbuttonText("درخواست با موفقیت ثبت شد");
                setshowCross(false);
                setBackgroundColor("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
                setTimeout(() => {
                  setLoading(false);
                  setIsValid(false);
                  setbuttonText("ثبت درخواست");
                  setshowCross(false);
                  setBackgroundColor("#8754AF");
                  dispatchCompanyWorkwithus({
                    type: "Reset",
                  });
                }, 1500);
                return data;
              } catch (error: any) {
                console.log(error.response.data);
                [
                  error.response.data.address,
                  error.response.data.call_number,
                  error.response.data.company_name,
                  error.response.data.phone_number,
                ].map((e) => {
                  console.log(e);
                  e.map((er: string) => {
                    toast.error(er);
                  });
                });
                setLoading(false);
                setIsValid(false);
                setbuttonText("درخواست با موفقیت ثبت نشد");
                setshowCross(true);
                setBackgroundColor("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
                setTimeout(() => {
                  setLoading(false);
                  setIsValid(false);
                  setshowCross(false);
                  setBackgroundColor("#8754AF");
                  setbuttonText("ثبت درخواست");
                }, 2000);
                if (axios.isCancel(error as AxiosError)) {
                  console.log("Request canceled by cleanup");
                }
              }
            } else {
              showToastErrorMessage();
            }
          }}
        />
      </section>
      <section className="container mx-auto md:px-10 flex flex-col py-7 px-5 w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-7 ">
        <h2
          id="adertising"
          className="font-semibold text-xl text-center text-[#303030] md:self-start md:p-3"
        >
          ثبت تبلیغات پربازده کسب و کار شما{" "}
        </h2>
        <div className="flex flex-col md:gap-4 lg:gap-10 md:flex-row lg:flex-row space-y-5 md:space-y-0   lg:space-y-0">
          <WorkwithUsCard
            handel={handelModalApp}
            img={phone}
            title="بنر در اپلیکیشن موبایل"
            text="محصول تیم خلاق آران آسایش آفرینان یعنی کارت تخفیف آران آسایش، حامی اقتصاد خانوار بوده و تلاش شده است."
          />
          <WorkwithUsCard
            handel={handelModalSite}
            img={laptop}
            title="پیشنهاد ویژه در وبسایت"
            text="محصول تیم خلاق آران آسایش آفرینان یعنی کارت تخفیف آران آسایش، حامی اقتصاد خانوار بوده و تلاش شده است."
          />
        </div>
      </section>
      <section className="container mb-10 mx-auto flex flex-col py-7 md:pb-7 px-5  w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-7 md:gap-0 ">
        <h2 className="font-semibold text-xl md:text-2xl md:text-right md:pt-5 md:pr-10 text-center text-[#303030] ">
          راه‌های ارتباطی آران آسایش{" "}
        </h2>
        <div className="flex flex-col justify-around md:flex-row">
          <div className="flex flex-col justify-around md:flex-row">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-5 p-1  md:space-y-0">
              <div className="w-10/12  md:p-3 gap-1 flex flex-col justify-center items-center">
                <h3 className="text-center mb-2 text-lg font-semibold">
                  شبکه‌های اجتماعی
                </h3>
                <div className="flex md:scale-75 md:py-1 md:mx-auto flex-row-reverse items-center justify-between p-3">
                  <LazyImage
                    src={telegram}
                    className="mr-5 !w-[26px] !h-6"
                    alt="telegram"
                    width={24}
                    height={24}
                  />
                  <span className="text-lg font-light text-[#303030]">
                    @aranasayesh_ir
                  </span>
                </div>
                <div className="flex md:scale-75 md:py-1 md:mx-auto flex-row-reverse items-center justify-between p-3">
                  <LazyImage
                    src={instegram}
                    className="mr-5 !w-[33px] !h-[30px]"
                    alt="instegram"
                    width={33}
                    height={30}
                  />
                  <span className="text-lg font-light text-[#303030]">
                    @aranasayesh_ir
                  </span>
                </div>
                <div className="flex md:scale-75 md:py-1 md:mx-auto flex-row-reverse items-center justify-between p-3">
                  <LazyImage
                    src={whatsapp}
                    className="mr-5 !w-8 !h-8"
                    alt="whatsapp"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-light text-[#303030]">
                    @aranasayesh_ir
                  </span>
                </div>
                <div className="flex md:scale-75 md:py-1 md:mx-auto flex-row-reverse items-center justify-between p-3">
                  <LazyImage
                    src={eitaa}
                    className="mr-5 !w-[29px] !h-[29px]"
                    alt="eitaa"
                    width={29}
                    height={29}
                  />
                  <span className="text-lg font-light text-[#303030]">
                    @aranasayesh_ir
                  </span>
                </div>
              </div>
              <div className="flex-1 w-48 md:w-full -mt-20 md:rotate-180 md:mx-2 md:border-r-2 md:border-t-0 md:h-[70%] mx-20 border-t-2  md:mt-0 border-[#717171] rounded-none border-dotted md:border-3"></div>
            </div>
            <div className="flex flex-col mt-3 md:mt-0 gap-4 items-center justify-center">
              <div className="flex flex-col gap-2 justify-center items-center space-y-5 p-1  md:space-y-0">
                <div className="w-12/12 flex flex-col justify-center items-center">
                  <h3 className="text-center mb-2 text-lg font-semibold">
                    اطلاعات تماس
                  </h3>
                  <div className="flex p-3 md:px-1 md:scale-75 md:py-1 md:mx-auto flex-row-reverse items-center justify-between ">
                    <LazyImage
                      src={call}
                      className="mr-3 !w-8 !h-8"
                      alt="call"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-light text-[#303030]">
                      025-31234567
                    </span>
                  </div>
                  <span className="p-2 md:px-1 md:scale-75 md:py-1 md:mx-auto">
                    ساعت پاسخگویی: 9 - 21
                  </span>
                </div>
                <div className="flex-1 w-48 md:w-full md:10/12 mx-20 border-t-2  mt-3 border-[#717171] rounded-none border-dotted md:border-3"></div>
              </div>
              <div className="flex flex-col justify-center items-center md:space-y-0">
                <div className=" flex flex-col justify-center items-center">
                  <h3 className="text-center mb-2 md:mt-1 md:mb-0 text-lg font-semibold">
                    آدرس ایمیل
                  </h3>
                  <div className="flex p-3 md:scale-75 md:py-1 flex-row-reverse items-center justify-between ">
                    <LazyImage
                      src={sms}
                      className="mr-3 !w-8 !h-8"
                      alt="sms"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-light text-[#303030]">
                      aranasayesh@gmail.com
                    </span>
                  </div>
                </div>
                <div className="flex-1 w-48 md:w-full md:hidden mx-20 border-t-2  mt-3 border-[#717171] rounded-none border-dotted md:border-3"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md justify-center items-center md:space-y-0">
            <div className=" flex flex-col justify-center items-center md:items-start">
              <span className="text-center mb-2 text-lg font-semibold mt-6">
                آدرس
              </span>
              <span className="text-center mb-2 text-lg font-light md:text-sm md:text-start">
                قم، خیابان صفاییه، کوچه 56، فرعی 13، ساختمان سیما، طبقه 4، واحد
                146
              </span>
              <div className="flex p-3 md:p-0 flex-row-reverse items-center justify-between ">
                <LazyImage
                  src={map}
                  className="md:!w-56 lg:!w-96 lg:!h-full md:!h-28"
                  alt="map"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        open={openSite}
        handler={handelModalSite}
        className="!w-auto !max-w-[90%] sm:!min-w-96"
      >
        <DialogBody
          className="h-auto !w-auto !m-0 !p-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex p-3 flex-col m-auto space-y-3 justify-center items-center">
            <Input
              Name="company_name"
              sizing="md"
              type="text"
              ClassName="w-full"
              placeholder="نام و نام خانوادگی"
              value={CompanyWorkwithus.RequestSite.company_name}
              onChange={(e) => {
                dispatchCompanyWorkwithus({
                  type: "setRequestsite",
                  payload: { key: e.target.name, value: e.target.value },
                });
              }}
            />
            <Input
              Name="phone_number"
              sizing="md"
              type="text"
              ClassName="w-full"
              placeholder="شماره تماس"
              value={CompanyWorkwithus.RequestSite.phone_number}
              onChange={(e) => {
                dispatchCompanyWorkwithus({
                  type: "setRequestsite",
                  payload: { key: e.target.name, value: e.target.value },
                });
              }}
            />
            <SubmitButton
              className="h-11 text-base flex items-center shadow-none  text-gray-700 w-full justify-center"
              loading={loading}
              isValid={isValid}
              showCross={showCross}
              buttonBgColor={backgroundColor}
              buttonText={buttonText}
              onClick={async () => {
                if (getCookie("accessToken") ) {
                  setLoading(true);
                  setbuttonText("درحال درخواست");

                  let cancelTokenSource: CancelTokenSource | null = null;
                  try {
                    cancelTokenSource = axios.CancelToken.source();
                  } catch (error) {
                    // Handle error if cancel token creation fails
                    console.error("Failed to create cancel token:", error);
                  }

                  if (!cancelTokenSource) return;

                  try {
                    const response = await axiosInstance.post(
                      "request/banner/site/",
                      CompanyWorkwithus.RequestSite,
                      {
                        cancelToken: cancelTokenSource.token,
                      }
                    );
                    const data = response.data;
                    console.log(data);
                    setLoading(false);
                    setIsValid(true);
                    setbuttonText("درخواست با موفقیت ثبت شد");
                    setshowCross(false);
                    setBackgroundColor("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
                    setTimeout(() => {
                      setLoading(false);
                      handelModalSite();
                      setIsValid(false);
                      setbuttonText("ثبت درخواست");
                      setshowCross(false);
                      setBackgroundColor("#8754AF");
                      dispatchCompanyWorkwithus({
                        type: "Reset",
                      });
                    }, 1500);
                    return data;
                  } catch (error: any) {
                    console.log(error.response.data);
                    if (error.response.data.company_name !== undefined) {
                      console.log("hi");
                      error.response.data.company_name.map((er: string) => {
                        toast.error(er);
                      });
                    }
                    if (error.response.data.phone_number !== undefined) {
                      error.response.data.phone_number.map((er: string) => {
                        toast.error(er);
                      });
                    }

                    setLoading(false);
                    setIsValid(false);
                    setbuttonText("درخواست با موفقیت ثبت نشد");
                    setshowCross(true);
                    setBackgroundColor("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
                    setTimeout(() => {
                      setLoading(false);
                      setIsValid(false);
                      setshowCross(false);
                      setBackgroundColor("#8754AF");
                      setbuttonText("ثبت درخواست");
                    }, 2000);
                    if (axios.isCancel(error as AxiosError)) {
                      // console.log("Request canceled by cleanup");
                    }
                  }
                } else {
                  showToastErrorMessage();
                }
              }}
            />
          </div>
        </DialogBody>
      </Dialog>
      <Dialog
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        open={openApp}
        handler={handelModalApp}
        className="!w-auto !max-w-[90%] sm:!min-w-96"
      >
        <DialogBody
          className="h-auto !w-auto !m-0 !p-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex p-3 flex-col m-auto  space-y-3 justify-center items-center">
            <Input
              Name="name"
              sizing="md"
              type="text"
              ClassName="w-full"
              value={CompanyWorkwithus.RequestApp.name}
              placeholder="نام و نام خانوادگی"
              onChange={(e) => {
                dispatchCompanyWorkwithus({
                  type: "setRequestapp",
                  payload: { key: e.target.name, value: e.target.value },
                });
              }}
            />
            <Input
              Name="phone"
              sizing="md"
              type="text"
              ClassName="w-full"
              placeholder="شماره تماس"
              value={CompanyWorkwithus.RequestApp.phone}
              onChange={(e) => {
                dispatchCompanyWorkwithus({
                  type: "setRequestapp",
                  payload: { key: e.target.name, value: e.target.value },
                });
              }}
            />
            <SubmitButton
              className="h-11 text-base flex items-center shadow-none  text-gray-700 w-full justify-center"
              loading={loading}
              isValid={isValid}
              showCross={showCross}
              buttonBgColor={backgroundColor}
              buttonText={buttonText}
              onClick={async () => {
                if (getCookie("accessToken") ) {
                  setLoading(true);
                  setbuttonText("درحال درخواست");

                  let cancelTokenSource: CancelTokenSource | null = null;
                  try {
                    cancelTokenSource = axios.CancelToken.source();
                  } catch (error) {
                    // Handle error if cancel token creation fails
                    console.error("Failed to create cancel token:", error);
                  }

                  if (!cancelTokenSource) return;

                  try {
                    const response = await axiosInstance.post(
                      "request/banner/app/",
                      CompanyWorkwithus.RequestApp,
                      {
                        cancelToken: cancelTokenSource.token,
                      }
                    );
                    const data = response.data;
                    console.log(data);
                    setLoading(false);
                    setIsValid(true);
                    setbuttonText("درخواست با موفقیت ثبت شد");
                    setshowCross(false);
                    setBackgroundColor("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
                    setTimeout(() => {
                      setLoading(false);
                      handelModalApp();
                      setIsValid(false);
                      setbuttonText("ثبت درخواست");
                      setshowCross(false);
                      setBackgroundColor("#8754AF");
                      dispatchCompanyWorkwithus({
                        type: "Reset",
                      });
                    }, 1500);
                    return data;
                  } catch (error: any) {
                    console.log(error.response.data);
                    if (error.response.data.name !== undefined) {
                      console.log("hi");
                      error.response.data.name.map((er: string) => {
                        toast.error(er);
                      });
                    }
                    if (error.response.data.phone !== undefined) {
                      error.response.data.phone.map((er: string) => {
                        toast.error(er);
                      });
                    }

                    setLoading(false);
                    setIsValid(false);
                    setbuttonText("درخواست با موفقیت ثبت نشد");
                    setshowCross(true);
                    setBackgroundColor("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
                    setTimeout(() => {
                      setLoading(false);
                      setIsValid(false);
                      setshowCross(false);
                      setBackgroundColor("#8754AF");
                      setbuttonText("ثبت درخواست");
                    }, 2000);
                    if (axios.isCancel(error as AxiosError)) {
                      // console.log("Request canceled by cleanup");
                    }
                  }
                } else {
                  showToastErrorMessage();
                }
              }}
            />
          </div>
          <ToastContainer rtl={true} />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default WorkWithUs;
