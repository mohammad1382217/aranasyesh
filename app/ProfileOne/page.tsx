import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import React, { useEffect, useReducer, useState } from "react";
import diamond from "../assets/svg/Beautiful-diamond.svg";
import yaghot from "../assets/svg/yaghot.svg";
import zomorod from "../assets/svg/emerald.svg";
import Firooze from "../assets/svg/cyan-diamond.svg";
import copy from "../assets/svg/copy to clipboard.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import ProvinceData from "../data/province.json";
import {
  CitiesReducer,
  initialCities,
} from "../api/Slices/ProvinceSlice/Cities";
import fetchCities from "../api/fetchCities";
import noteText from "../assets/svg/note-text.svg";
import { userReducer, initialUser } from "../api/Slices/UserSlice/userReducer";
import axiosInstance, { deleteCookie } from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import copied from "../assets/svg/copy.svg";
import { Link } from "react-router-dom/dist";
import { Select } from "flowbite-react";
import { useAuth } from "../api/authContext";
import UserService from "../api/fetchAccount";

const Loading = React.lazy(() => import("../components/loading"));
const Input = React.lazy(() => import("../components/input"));
const SubmitButton = React.lazy(() => import("../components/submitButton"));
const FlowbiteListGroup = React.lazy(() => import("../components/ListGroup"));
const LazyImage = React.lazy(() => import("../components/LazyImage"));
const TextArea = React.lazy(() => import("../components/TextArea"));
const BreadcrumbsWithIcon = React.lazy(
  () => import("../components/BreadcrumbsWithIcon")
);

export const CustomInput: React.FC<CustomInputProps> = ({
  onFocus,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
        onChange={onChange}
        type="text"
        className="block outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full py-1.5 px-3"
        placeholder="تاریخ تولد"
        autoComplete="off"
        value={value}
      />
      <LazyImage
        onClick={onFocus as React.MouseEventHandler<HTMLImageElement>}
        className="relative left-8 cursor-pointer w-7 h-7"
        src={noteText}
        alt="noteText"
        width={28}
        height={28}
      />
    </div>
  );
};

export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const ProfileOne: React.FC = () => {
  const { account, profile, dispatch, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [background, setBackground] = useState("#8754AF");
  const [showCross, setShowCross] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [UserState, dispatchUser] = useReducer(userReducer, initialUser);

  const [CitiesState, dispatchCities] = useReducer(
    CitiesReducer,
    initialCities
  );

  useEffect(() => {
    dispatch({ type: "SET_UPDTAE_PROFILE", payload: !updateProfile });
    if (profile?.province !== "") {
      if (profile?.province !== null) {
        const cleanuptwo = fetchCities(dispatchCities, profile?.province!);
        return cleanuptwo;
      }
    }
  }, [profile?.province]);

  
  const handleLogout = () => {
    deleteCookie("accessToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    dispatch({ type: "SET_ADMIN", payload: false });
    dispatch({ type: "SET_LOGGED_IN", payload: false });
    dispatch({ type: "SET_PROFILE", payload: null });
    dispatch({ type: "SET_ACCOUNT", payload: null });
    navigate("/");
  };

  const List: List[] = [
    { title: "اطلاعات حساب", link: "/ProfileOne" },
    { title: "تاریخچه تخفیف", link: "/ProfileTwo" },
    { title: "خروج از حساب", link: "/", click: () => handleLogout() },
  ];

  // تابع برای هندل کردن تغییرات در فرم
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    dispatchUser({ type: "SET_EDIT_PROFILE", payload: { key: name, value } });
    if (name === "province") {
      fetchCities(dispatchCities, value);
    }
  };

  // تابع برای هندل کردن ارسال فرم
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoadingEdit(true);
    event.preventDefault();
    try {
      await axiosInstance.put(
        `account/${account?.results[0].id}/`,
        UserState.editProfile!
      );
      if (account!.results[0]?.id) {
        const profileData = await UserService.getProfile(
          account!.results[0].id
        );
        dispatch({ type: "SET_PROFILE", payload: profileData });
      }
      setTimeout(() => {
        setBackground("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
        setLoadingEdit(false);
        setIsValid(true);
        setShowCross(false);
      }, 2000);
      setTimeout(() => {
        setLoadingEdit(false);
        setIsValid(false);
        setShowCross(false);
        setBackground("#8754AF");
        setIsEdit(false);
      }, 4000);
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
        setBackground("#8754AF");
        setIsEdit(false);
      }, 4000);
    }
  };

  return (
    <>
      <section className="bg-[#F5F5F5] w-full flex flex-col justify-center py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full flex items-center justify-start rounded-2xl">
            <BreadcrumbsWithIcon
              Address={[
                { lable: "پروفایل کاربری", link: "/ProfileOne" },
                {
                  lable: isEdit === false ? "اطلاعات حساب" : "ویرایش حساب",
                  link: "#",
                },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="bg-[#F5F5F5] w-full flex flex-col justify-center py-8">
        <div className="flex flex-col lg:flex-row container mx-auto px-6 lg:px-8 gap-8">
          <section className="flex justify-center">
            <FlowbiteListGroup List={List} />
          </section>
          <section className="bg-white flex flex-col p-8 lg:p-12 rounded-2xl w-full sm:flex-col items-center justify-between gap-5">
            <div className="w-full flex flex-wrap xl:flex-nowrap items-center justify-between gap-2 md:gap-4 lg:border-b lg:border-b-[#ECECEC] lg:pb-5">
              <h2 className="flex-1 xl:flex-initial text-xl xs:text-base font-semibold">
                اطلاعات کاربری
              </h2>
              {!isEdit ? (
                <div
                  className={`w-full xl:w-auto flex flex-col md:flex-row md:items-center items-start md:gap-6 gap-2 ${
                    account?.results[0]?.subscription.name === "الماس"
                      ? "bg-gradient-to-r from-[#19177C] to-[#463CB9]"
                      : account?.results[0]?.subscription.name === "یاقوت"
                      ? "bg-gradient-to-r from-red-900 to-red-600"
                      : account?.results[0]?.subscription.name === "زمرد"
                      ? "bg-gradient-to-r from-green-900 to-green-600"
                      : account?.results[0]?.subscription.name === "فیروزه"
                      ? "bg-gradient-to-r from-cyan-900 to-cyan-600"
                      : "bg-gradient-to-r from-blue-gray-900 to-blue-gray-600"
                  } text-white py-2 px-4 rounded-lg order-3 xl:order-none`}
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <h2 className="text-base xs:!text-sm font-semibold">
                      نوع اشتراک:
                    </h2>
                    <span className="text-base xs:!text-sm font-light">
                      {account?.results[0]?.subscription.is_buy
                        ? account?.results[0]?.subscription.name === ""
                          ? "جشنواره"
                          : account?.results[0]?.subscription.name
                        : "معمولی"}
                    </span>
                    {account?.results[0]?.subscription.is_buy ? (
                      account?.results[0]?.subscription.name ===
                      "" ? null : account?.results[0]?.subscription.name ===
                        "الماس" ? (
                        <LazyImage
                          className="w-8 h-6 xs:w-6 xs:h-4"
                          src={diamond}
                          alt="diamond"
                          width={32}
                          height={24}
                        />
                      ) : account?.results[0]?.subscription.name === "یاقوت" ? (
                        <LazyImage
                          className="w-8 h-6 xs:w-6 xs:h-4"
                          src={yaghot}
                          alt=""
                          width={32}
                          height={24}
                        />
                      ) : account?.results[0]?.subscription.name ===
                        "فیروزه" ? (
                        <LazyImage
                          className="w-8 h-6 xs:w-6 xs:h-4"
                          src={Firooze}
                          alt=""
                          width={32}
                          height={24}
                        />
                      ) : account?.results[0]?.subscription.name === "زمرد" ? (
                        <LazyImage
                          className="w-8 h-6 xs:w-6 xs:h-4"
                          src={zomorod}
                          alt=""
                          width={32}
                          height={24}
                        />
                      ) : null
                    ) : (
                      <Link
                        to="/BuySubscription"
                        className="text-base xs:!text-sm font-light text-white"
                      >
                        خرید اشتراک
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center gap-4 xs:gap-1">
                    {account?.results[0]?.subscription.remain === "" ? null : (
                      <>
                        <h2 className="text-base xs:!text-sm font-semibold">
                          زمان باقیمانده:
                        </h2>
                        <span className="text-base xs:!text-sm font-light">
                          {account?.results[0]?.subscription.remain
                            ? account?.results[0]?.subscription.remain + " روز "
                            : "0 روز"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
              <div className="w-max relative flex flex-1 md:flex-initial items-center justify-center font-sans font-bold uppercase whitespace-nowrap select-none !text-sm xs:py-1 xs:px-2 py-2 px-4 rounded-lg text-[#8754AF] border-none bg-[#F5F5F5] gap-2">
                {isCopied ? (
                  <LazyImage
                    className="w-[24px] h-[24px] cursor-pointer !aspect-square"
                    onClick={() => {
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 4000);
                    }}
                    src={copied}
                    alt="copied"
                    width={24}
                    height={24}
                  />
                ) : (
                  <LazyImage
                    className="w-[24px] h-[24px] cursor-pointer !aspect-square"
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(
                        `${profile?.customer_code}`
                      );
                      setTimeout(() => setIsCopied(false), 4000);
                    }}
                    src={copy}
                    alt={"copy"}
                    width={24}
                    height={24}
                  />
                )}
                <span className="text-lg">{profile?.customer_code}</span>
              </div>
            </div>
            <section className="w-full flex items-center justify-between">
              <div className="w-full flex flex-col lg:flex-row-reverse items-center justify-between gap-8">
                {isEdit ? null : (
                  <div className="w-full lg:w-auto flex flex-col items-center">
                    <LazyImage
                      className="w-full lg:w-[178px] cursor-pointer !aspect-square"
                      src={`https://api.aranasayesh.ir/${profile?.qr_code}`}
                      alt="qr_code"
                      width={178}
                      height={"100%"}
                    />
                    <span className="text-lg tracking-[12px]">
                      {profile?.representative_code}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-5 w-full">
                  {isEdit ? (
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full flex xs:flex-col gap-3">
                        <div className="w-full flex flex-col gap-2">
                          <Input
                            ClassName="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3"
                            placeholder="نام"
                            Name={"first_name"}
                            value={
                              UserState.editProfile!.first_name
                                ? UserState.editProfile!.first_name
                                : undefined
                            }
                            onChange={(e) => handleChange(e)}
                            sizing="md"
                          />
                          {UserState.editProfile!.first_name?.length === 0 ? (
                            <div className="text-red-500 text-sm">
                              {"فیلد را وارد کنید"}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <Input
                            ClassName="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3"
                            placeholder="نام خانوادگی"
                            Name={"last_name"}
                            value={
                              UserState.editProfile!.last_name! === ""
                                ? undefined
                                : UserState.editProfile!.last_name!
                            }
                            onChange={(e) => handleChange(e)}
                            sizing="md"
                          />
                          {UserState.editProfile!.last_name?.length === 0 ? (
                            <div className="text-red-500 text-sm">
                              {"فیلد را وارد کنید"}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full relative inline-flex flex-col gap-2">
                          <DatePicker
                            name={"birth_date"}
                            render={<CustomInput />}
                            onChange={(date) => {
                              if (date instanceof DateObject) {
                                dispatchUser({
                                  type: "SET_EDIT_PROFILE",
                                  payload: {
                                    key: "birth_date",
                                    value: date
                                      .convert(persian, persian_en)
                                      .format("YYYY-MM-DD")
                                      .toString(),
                                  },
                                });
                              }
                            }}
                            weekDays={weekDays}
                            calendar={persian}
                            locale={persian_fa}
                            value={UserState.editProfile!.birth_date!}
                            calendarPosition="bottom-center"
                            inputClass="block outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3"
                            placeholder="تاریخ تولد"
                          />
                          {UserState.editProfile!.birth_date?.length === 0 ? (
                            <div className="text-red-500 text-sm">
                              {"فیلد را وارد کنید"}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <Input
                        ClassName="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 xs:w-full py-1.5 px-3"
                        placeholder="آدرس ایمیل"
                        Name={"email"}
                        value={UserState.editProfile!.email!}
                        onChange={(e) => handleChange(e)}
                        sizing="lg"
                      />
                      {UserState.editProfile!.email?.length === 0 ? (
                        <div className="text-red-500 text-sm">
                          {"فیلد را وارد کنید"}
                        </div>
                      ) : null}
                      <div className="w-full flex xs:flex-col gap-3">
                        <div className="w-full flex flex-col gap-2">
                          <Select
                            name={"province"}
                            defaultValue={
                              UserState.editProfile!.province!
                                ? UserState.editProfile!.province!
                                : "DEFAULT"
                            }
                            onChange={(e) => handleChange(e)}
                            className="w-full"
                          >
                            <option value="DEFAULT" disabled>
                              استان
                            </option>
                            {ProvinceData.map((Province) => (
                              <option key={Province.id} value={Province.name}>
                                {Province.name}
                              </option>
                            ))}
                          </Select>
                          {UserState.editProfile!.province?.length === 0 ? (
                            <div className="text-red-500 text-sm">
                              {"فیلد را وارد کنید"}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <Select
                            name={"city"}
                            onChange={(e) => handleChange(e)}
                            defaultValue={
                              UserState.editProfile!.city!
                                ? UserState.editProfile!.city!
                                : "DEFAULT"
                            }
                            className="w-full"
                          >
                            <option value="DEFAULT" disabled>
                              شهر
                            </option>
                            {CitiesState.Cities
                              ? CitiesState.Cities.map((city, index) => (
                                  <option value={city} key={index}>
                                    {city}
                                  </option>
                                ))
                              : null}
                          </Select>
                          {UserState.editProfile!.city?.length === 0 ? (
                            <div className="text-red-500 text-sm">
                              {"فیلد را وارد کنید"}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <TextArea
                        Name={"address"}
                        Value={
                          UserState.editProfile!.address! === ""
                            ? undefined
                            : UserState.editProfile!.address!
                        }
                        onChange={(e) => handleChange(e)}
                        TextAreaClass={"h-32 text-[#303030]"}
                        placeholder={"آدرس"}
                      />
                      {UserState.editProfile!.address?.length === 0 ? (
                        <div className="text-red-500 text-sm">
                          {"فیلد را وارد کنید"}
                        </div>
                      ) : null}
                      <div className="flex justify-end">
                        <SubmitButton
                          className="py-2 px-8 rounded-lg border-[#8754AF] text-lg font-semibold bg-[#8754AF] hover:!bg-[#8754AF] text-white gap-2 !w-44"
                          buttonText="ثبت اطلاعات"
                          loading={loadingEdit}
                          isValid={isValid}
                          showCross={showCross}
                          buttonBgColor={background}
                          onClick={() => {}}
                        />
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="w-full flex flex-col xl:flex-row justify-start mt-4  gap-10 xl:gap-4">
                        <div className="flex gap-2">
                          <span className="text-[#7F38B7] font-bold w-auto">
                            نام
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.first_name}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            نام خانوادگی
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.last_name}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            تاریخ تولد
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.birth_date}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex flex-col xl:flex-row justify-start mt-4  gap-10 xl:gap-5">
                        <div className="flex gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            شماره تماس
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.phone_number}
                          </span>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            آدرس ایمیل
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.email}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex flex-col lg:flex-row justify-start mt-4  gap-10 xl:gap-4">
                        <div className="flex gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            استان
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.province}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            شهر
                          </span>
                          <span className="text-[#303030] w-24">
                            {profile?.city}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex flex-col lg:flex-row justify-start mt-4  gap-10 xl:gap-4">
                        <div className="flex flex-col lg:flex-row gap-2">
                          <span className="text-[#7F38B7] font-bold w-24">
                            آدرس
                          </span>
                          <span className="text-[#303030]">
                            {profile?.address}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
            <div className="w-full flex items-center justify-center lg:justify-end">
              {isEdit ? null : (
                <SubmitButton
                  className="py-2 px-8 rounded-lg border-[#8754AF] text-lg font-semibold bg-[#8754AF] hover:!bg-[#8754AF] text-white gap-2 !w-44"
                  buttonText="ویرایش اطلاعات"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                  loading={loading}
                  isValid={isValid}
                  showCross={showCross}
                  buttonBgColor={background}
                />
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProfileOne;

// Types
export interface CustomInputProps {
  value?: string;
  onFocus?:
    | React.FocusEventHandler<HTMLInputElement>
    | React.MouseEventHandler<HTMLImageElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface List {
  title: string;
  link: string;
  click?:
    | ((() => void) &
        React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLButtonElement>)
    | undefined;
}
