import React, {
  lazy,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import gift from "../assets/svg/gift.svg";
import search from "../assets/svg/search.svg";
import { LuUser2 } from "react-icons/lu";
import axiosInstance, { getCookie, setCookie } from "../api/apiConfig";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { HomeReducer, initialHome } from "../api/Slices/HomeSlice/Home";
import { LoginReducer, initialLogin } from "../api/Slices/LoginSlice/Login";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { HiDownload, HiMenu } from "react-icons/hi";
import logo from "../assets/svg/logo-orginal.svg";
import {
  UserContext,
  UserContextType,
} from "../api/Slices/UserSlice/userProvider";
import { ThemeProvider } from "@material-tailwind/react/context/theme";
import Context, { ContextType } from "../api/context";

const AccordionCustomIcon = lazy(() => import("./AccordionWithIcon"));
const MaterialInput = lazy(
  () => import("@material-tailwind/react/components/Input")
);
const Drawer = lazy(() => import("@material-tailwind/react/components/Drawer"));
const IconButton = lazy(
  () => import("@material-tailwind/react/components/IconButton")
);
const Input = lazy(() => import("../components/input"));
const SubmitButton = lazy(() => import("../components/submitButton"));
const DropdownCategory = lazy(() => import("../components/DropdownCategory"));
const Button = lazy(() => import("@material-tailwind/react/components/Button"));
const DialogBody = lazy(
  () => import("@material-tailwind/react/components/Dialog/DialogBody")
);
const Dialog = lazy(() => import("@material-tailwind/react/components/Dialog"));
const LazyImage = lazy(() => import("./LazyImage"));

const Header = () => {
  const navigate = useNavigate();
  const User = useContext(UserContext);
  const { account, setAccount, isLoggedIn, setIsLoggedIn } =
    User as UserContextType;
  const context = useContext(Context);
  const { categoryData } = context as ContextType;
  const [showCross, setShowCross] = useState(false);
  const [background, setBackground] = useState("#8754AF");
  const [HomeState, dispatchHome] = useReducer(HomeReducer, initialHome);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loadingSms, setLoadingSms] = useState(false);

  useEffect(() => {
    if (getCookie("accessToken")) {
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
          const response = await axiosInstance.get("account/", {
            cancelToken: cancelTokenSource.token,
          });
          const data = response.data;
          setIsLoggedIn(true);
          setAccount(data);
        } catch (error) {
          if (axios.isCancel(error as AxiosError)) {
            console.log("Request canceled by cleanup");
          }
        }
      };

      fetchData();
    }
  }, [getCookie("accessToken")]);

  const handlepostPhoneNumber = async () => {
    setLoading(true);
    setButtonText("در حال ارسال");

    const regex1 = /^(?:(?:(?:\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
    // const phoneNumber = Number(LoginState.PhoneNumber.phone_number);
    if (regex1.test(LoginState.PhoneNumber.phone_number)) {
      try {
        await axiosInstance.post(
          "account/",
          LoginState.PhoneNumber
        );
        // setTimeout(() => {

        // }, 2000);
        setLoading(false);
        setButtonText("کد ارسال شد");
        setIsValid(true);
        setShowCross(false);
        setBackground("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
        setTimeout(() => {
          setLoading(false);
          setButtonText("ورود");
          setIsValid(false);
          setShowCross(false);
          setBackground("#8754AF");
        }, 2000);
        setisSendSms(true);
      } catch {
        setTimeout(() => {
          setLoading(false);
          setIsValid(false);
          setShowCross(true);
          setButtonText("کد ارسال نشد دوباره تلاش کنید");
          setBackground("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
        }, 2000);
        setTimeout(() => {
          setLoading(false);
          setIsValid(false);
          setButtonText("ادامه");
          setShowCross(false);
          setBackground("#8754AF");
        }, 4000);
        setisSendSms(false);
      } finally {
        setLoading(false);
        // setButtonText('ادامه');
      }
    } else {
      console.log("شماره تلفن همراه معتبر نیست.");
      setShowCross(true);
      setLoading(false);
      setButtonText("شماره تلفن همراه معتبر نیست.");
      setBackground("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
      setTimeout(() => {
        setLoading(false);
        setIsValid(false);
        setButtonText("ادامه");
        setShowCross(false);
        setBackground("#8754AF");
      }, 2000);
    }
  };

  const showModalLogin = () => {
    dispatchHome({
      type: "setIsShowModalLogin",
      payload: !HomeState.isShowModalHandler,
    });
  };

  const [openDrawerRight, setOpenDrawerRight] = React.useState(false);
  const setOpenDrawerRightHandler = () => setOpenDrawerRight(!openDrawerRight);
  const [isSendSms, setisSendSms] = React.useState(false);
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const secondInputRef = React.useRef<HTMLInputElement>(null);
  const thirdInputRef = React.useRef<HTMLInputElement>(null);
  const fourthInputRef = React.useRef<HTMLInputElement>(null);
  const fifthInputRef = React.useRef<HTMLInputElement>(null);

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

  const theme = {
    drawer: {
      styles: {
        base: {
          overlay: {
            position: "fixed",
          },
        },
      },
    },
  };

  // Login
  const [LoginState, dispatchLogin] = useReducer(LoginReducer, initialLogin);

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
      setButtonText("در حال برسی کد");

      try {
        const response = await axiosInstance.post(
          "account/otp-valid/",
          loginState,
          {
            cancelToken: cancelTokenSource.token,
          }
        );
        const data = response.data;
        console.log(data.token)
        setCookie("accessToken", data.token,7,true);
        setLoading(false);
        setIsValid(true);
        setButtonText("ادامه");
        setShowCross(false);
        setBackground("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
        setTimeout(() => {
          setLoading(false);
          setIsValid(false);
          setShowCross(false);
          setBackground("#8754AF");
        }, 2000);
        return true;
      } catch (error: any) {
        setLoading(false);
        setIsValid(false);
        setButtonText(error.response.data[0]);
        setShowCross(true);
        setBackground("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
        setTimeout(() => {
          setLoading(false);
          setIsValid(false);
          setShowCross(false);
          setButtonText("ورود");

          setBackground("#8754AF");
        }, 2000);
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
      showToastErrorMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatchLogin({ type: "setCode", payload: { key: name, value } });

    const { code } = LoginState;

    if (code.code1 && code.code2 && code.code3 && code.code4 && code.code5) {
      dispatchLogin({ type: "setOtp" });
    }
  };

  const [SearchInput, setSearchInput] = useState("");
  const [buttonText, setButtonText] = useState("ادامه");
  const [ModalSearch, setModalSearch] = useState(false);
  const handelModalSearch = () => {
    setModalSearch(!ModalSearch);
  };
  const [error, setError] = useState(false);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" && !loading && !isValid && !showCross) {
      handlepostPhoneNumber();
    }
  };
  
  const handelSearch = () => {
    navigate(`search?q=${SearchInput}`);
    setModalSearch(false);
    setSearchInput("");
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("myHeader");
      if (header) {
        const sticky = header.offsetTop;

        if (window.scrollY > sticky) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="shadow-md border-b-1 shadow-[#00000040]">
      <section className="w-full flex items-center justify-center py-6 lg:py-4 sm:border-b-1">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="w-full flex  justify-between px-0 py-4 gap-2 ">
            <div className="inline-flex items-center 2xl:hidden">
              <ThemeProvider value={theme}>
                <IconButton
                  aria-label="drawer"
                  onClick={() => setOpenDrawerRightHandler()}
                  className="!bg-transparent shadow-none hover:shadow-none z-40"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <HiMenu className="w-7 h-7 text-[#8754AF]" />
                </IconButton>
                <Drawer
                  placement="right"
                  open={openDrawerRight}
                  onClose={() => setOpenDrawerRightHandler()}
                  className={`fixed top-0 bottom-0 right-0 w-60 overflow-auto`}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div className="flex flex-col items-center p-6 gap-8">
                    {isLoggedIn ? null : (
                      <Button
                        onClick={() => {
                          setOpenDrawerRightHandler();
                          showModalLogin();
                        }}
                        className="w-full py-2 px-3 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        ورود به حساب کاربری
                      </Button>
                    )}
                    {isLoggedIn ? (
                      account?.results[0]?.permission?.is_owner ? (
                        <>
                          <Button
                            className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            onClick={() => {
                              setOpenDrawerRight(false);
                              navigate("/profileOne");
                            }}
                          >
                            پروفایل کاربری
                          </Button>
                          <Button
                            className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            onClick={() => {
                              setOpenDrawerRight(false);
                              navigate("/CCP/ConfirmCode");
                            }}
                          >
                            پنل مدیریت
                          </Button>
                        </>
                      ) : (
                        <Button
                          className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          onClick={() => {
                            setOpenDrawerRight(false);
                            navigate("/profileOne");
                          }}
                        >
                          پروفایل کاربری
                        </Button>
                      )
                    ) : null}

                    <Link
                      className="cursor-pointer"
                      to={"/BuySubscription"}
                      onClick={() => setOpenDrawerRight(false)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-semibold text-[#8754AF]">
                          خرید کارت تخفیف
                        </span>
                        <LazyImage
                          className="!aspect-square !w-6 !h-6"
                          loading="eager"
                          src={gift}
                          alt={"هدیه"}
                          width={25}
                          height={24}
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col">
                      {categoryData.map((category) => (
                        <AccordionCustomIcon
                          key={category.id}
                          headerTitle={category.show_name}
                          Id={category.id}
                        >
                          <ul className="list-none block">
                            {category.sub_categories.map((items) => (
                              <li
                                key={items.id}
                                className="w-48 cursor-pointer p-3"
                                onClick={async () => {
                                  setOpenDrawerRight(false);
                                  navigate(
                                    `Category/${category.name}/SubCategory/${items.name}/`
                                  );
                                }}
                              >
                                {items.name}
                              </li>
                            ))}
                          </ul>
                        </AccordionCustomIcon>
                      ))}
                    </div>
                  </div>
                </Drawer>
              </ThemeProvider>
            </div>
            <Link className="block" to={"/"}>
              <div className="flex items-center justify-center gap-2 xl:gap-4">
                <div className="flex self-center ">
                  <LazyImage
                    loading="eager"
                    src={logo}
                    className="xl:w-[79px] xl:h-[102px] !w-[43px] !h-[56px]"
                    alt={"logo"}
                    width={79}
                    height={102}
                  />
                </div>
                <span className="text-lg sm:text-2xl xl:text-3xl xs:text-base font-semibold text-[#8754AF]">
                  آران آسایش آفرینان
                </span>
              </div>
            </Link>
            <div className="flex 2xl:hidden items-center">
              <Button
                aria-label="search"
                className="cursor-pointer !bg-transparent shadow-none px-2"
                onClick={() => setModalSearch(true)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <LazyImage
                  className="!w-[27px] !h-[26px]"
                  loading="eager"
                  src={search}
                  alt={"search"}
                  width={27}
                  height={26}
                />
              </Button>
              <Dialog
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                open={ModalSearch}
                handler={handelModalSearch}
                className="!w-auto !max-w-[90%] sm:!min-w-96"
              >
                <DialogBody
                  className="h-auto !w-auto !m-0 !p-0"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <button
                    className="absolute z-50 left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                    onClick={handelSearch}
                  >
                    <svg
                      width="27"
                      height="26"
                      viewBox="0 0 27 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5778 22.7503C18.3163 22.7503 22.9682 18.1426 22.9682 12.4587C22.9682 6.77473 18.3163 2.16699 12.5778 2.16699C6.83942 2.16699 2.1875 6.77473 2.1875 12.4587C2.1875 18.1426 6.83942 22.7503 12.5778 22.7503Z"
                        stroke="#8754AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24.0612 23.8337L21.874 21.667"
                        stroke="#8754AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    autoFocus={true}
                    placeholder="جستجو (مرکز خدماتی، رستوران، استخر و ...)"
                    className="w-full xl:block !border-0 mx-0 rounded-[10px] py-2.5 px-3 z-20 focus:outline-none text-sm text-gray-900 bg-gray-50 !border-[#8754AF] focus:border-2 focus:shadow-none pl-12"
                    value={SearchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        // اینجا کدی که می‌خواهید هنگام فشردن Enter انجام شود را قرار دهید
                        handelSearch(); // تابعی که می‌خواهید اجرا شود را فراخوانی کنید
                      }
                    }}
                  />
                </DialogBody>
              </Dialog>
            </div>
            <div className="hidden 2xl:flex 2xl:items-center 2xl:justify-center gap-4">
              <Link className="cursor-pointer" to={"/BuySubscription"}>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-[#8754AF]">
                    خرید کارت تخفیف
                  </span>
                  <LazyImage
                    className="!aspect-square !w-6 !h-6"
                    loading="eager"
                    src={gift}
                    alt={"هدیه"}
                    width={25}
                    height={24}
                  />
                </div>
              </Link>
              {isLoggedIn ? null : (
                <>
                  <Button
                    className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={() => showModalLogin()}
                  >
                    ورود
                  </Button>
                </>
              )}
              {isLoggedIn ? (
                account?.results[0]?.permission?.is_owner ? (
                  <>
                    <Button
                      className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      onClick={() => {
                        navigate("/profileOne");
                      }}
                    >
                      پروفایل کاربری
                    </Button>
                    <Button
                      className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      onClick={() => {
                        navigate("/CCP/ConfirmCode");
                      }}
                    >
                      پنل مدیریت
                    </Button>
                  </>
                ) : (
                  <Button
                    className="py-2 rounded-lg border-[3px] border-solid border-[#8754AF] text-lg font-semibold text-[#8754AF] hover:!bg-white bg-white"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={() => {
                      navigate("/profileOne");
                    }}
                  >
                    پروفایل کاربری
                  </Button>
                )
              ) : null}

              <Link to="/Application">
                <Button
                  className="py-2.5 px-8 flex items-center justify-center rounded-lg border-[#8754AF] text-lg font-semibold bg-[#8754AF] hover:!bg-[#8754AF] text-white gap-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  دانلود اپلیکیشن
                  <HiDownload className="w-6 h-6" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </section>
      <section
        id="myHeader"
        className={`w-full hidden 2xl:flex 2xl:items-center 2xl:justify-center py-6 lg:py-4 bg-[#ECECEC] z-[9999] ${
          isSticky ? "stick" : ""
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="w-full flex items-center justify-between">
            <DropdownCategory />
            <div className="w-auto">
              <div className="relative flex items-center">
                <button
                  aria-label="search"
                  className="absolute z-50 left-3 top-1/2 transform -translate-y-1/2 bg-transparent shadow-none hover:bg-transparent hover:shadow-none border-none cursor-pointer p-0"
                  onClick={() => {
                    navigate(`search?q=${SearchInput}`);
                    setSearchInput("");
                  }}
                >
                  <LazyImage
                    loading="eager"
                    className="!aspect-square relative !w-[27px] !h-[26px]"
                    src={search}
                    alt={"search"}
                    width={27}
                    height={26}
                  />
                </button>
                <input
                  type="text"
                  placeholder="جستجو (مرکز خدماتی، رستوران، استخر و ...)"
                  className="w-[22rem] xl:block text-pretty rounded-[10px] py-2.5 px-3 z-20 focus:outline-none text-sm mx-1 text-gray-900 bg-gray-50 border-2 !border-[#8754AF] focus:border-2 focus:shadow-none focus:border-red-600 pl-10"
                  value={SearchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handelSearch(); // تابعی که می‌خواهید اجرا شود را فراخوانی کنید
                    }
                  }}
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
        open={HomeState.isShowModalHandler}
        handler={showModalLogin}
        className="!w-auto !max-w-[90%] sm:!min-w-96"
      >
        <DialogBody
          className="h-[30rem] !w-auto"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center justify-center w-full p-2 py-4">
            <LazyImage
              className="!w-20 !h-[102px]"
              loading="eager"
              src={logo}
              alt={"logo"}
              width={79}
              height={102}
            />
            <h1 className="text-2xl xs:text-xl font-semibold text-[#8754AF] mr-3">
              آران آسایش آفرینان
            </h1>
          </div>
          <div className="flex-1 border-[#ECECEC] border-t-2"></div>
          {isSendSms === false ? (
            <div className="px-2 mt-5">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlepostPhoneNumber(); // تابعی که می‌خواهید اجرا شود را فراخوانی کنید
                  }
                }}
              />
              <SubmitButton
                loading={loading}
                isValid={isValid}
                buttonText={buttonText}
                showCross={showCross}
                buttonBgColor={background}
                onClick={handlepostPhoneNumber}
                onKeyUp={handleKeyDown}
              />
            </div>
          ) : (
            <div className="px-2 mt-5 h-auto">
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
                  autoComplete="off"
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
                  className="text-center !w-10 !border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8] placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10"
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // اینجا کدی که می‌خواهید هنگام فشردن Enter انجام شود را قرار دهید
                      handlePostOtpValid(); // تابعی که می‌خواهید اجرا شود را فراخوانی کنید
                    }
                  }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // اینجا کدی که می‌خواهید هنگام فشردن Enter انجام شود را قرار دهید
                    handlePostOtpValid(); // تابعی که می‌خواهید اجرا شود را فراخوانی کنید
                  }
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
                buttonText={buttonText}
                showCross={showCross}
                buttonBgColor={background}
                onClick={handlePostOtpValid}
                // onKeyUp={handleKeyDown}
              />
            </div>
          )}

          <Button
            className="bg-[#ECECEC] w-full mt-3 rounded-t-none !absolute right-0 bottom-0 py-3 text-[#717171] text-base font-light"
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
      <ToastContainer rtl={true} />
    </header>
  );
};

export default Header;

export interface smsStates {
  phone_number: string;
  otp: string;
}
