import React, {
  ChangeEvent,
  lazy,
  useEffect,
  useReducer,
  useState,
} from "react";
import fetchCCP from "../../api/fetchccp";
import axiosInstance from "../../api/apiConfig";
import { CCPReducer, initialCCP } from "../../api/Slices/CCPSlice/CCP";
import Video from "../../components/video";
import { Label } from "flowbite-react";

const DragUpload = lazy(() => import("../../components/DragUpload"));
const TextArea = lazy(() => import("../../components/TextArea"));
const Input = lazy(() => import("../../components/input"));
const SubmitButton = lazy(() => import("../../components/submitButton"));
const LazyImage = lazy(() => import("../../components/LazyImage"));

export const List = [
  // { title: "اطلاعات مجموعه", link: "/CCP/CCP" },
  { title: "تأیید کد تخفیف", link: "/CCP/ConfirmCode" },
  { title: "سوابق تخفیف", link: "/CCP/DiscountHistory" },
  { title: "خروج از پنل مدیریت", link: "/" },
];

const CCP = () => {
  const [LoadingCCP, setLoadingCCP] = useState(false);
  const [isValidCCP, setIsValidCCP] = useState(false);
  const [showCrossCCP, setshowCrossCCP] = useState(false);
  const [backgroundColorCPP, setBackgroundColorCPP] =
    useState<string>("#8754AF");
  const [CCPState, dispatchCCP] = useReducer(CCPReducer, initialCCP);
  const [PatchData, setPatchData] = useState({});

  const putCCP = async () => {
    setLoadingCCP(true);
    const formData = new FormData();
    formData.append("id", `${CCPState.CCP.id}`);
    formData.append("company_name", CCPState.CCP.company_name);
    formData.append("company_image1", CCPState.CCP.company_image1);
    formData.append("company_image2", CCPState.CCP.company_image2);
    formData.append("company_image3", CCPState.CCP.company_image3);
    formData.append("company_image4", CCPState.CCP.company_image4);
    formData.append("company_image5", CCPState.CCP.company_image5);
    formData.append("video", CCPState.CCP.video!);
    formData.append("description", CCPState.CCP.description);
    formData.append("address", CCPState.CCP.address);
    formData.append("call_number", CCPState.CCP.call_number);
    formData.append("eita", CCPState.CCP.eita);
    formData.append("instagram", CCPState.CCP.instagram);
    formData.append("telegram", CCPState.CCP.telegram);

    try {
      await axiosInstance.patchForm(`ccp/${CCPState.CCP.id}/`, PatchData);
      const cleanupCCP = fetchCCP(dispatchCCP);
      setTimeout(() => {
        setBackgroundColorCPP("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
        setLoadingCCP(false);
        setIsValidCCP(true);
        setshowCrossCCP(false);
      }, 2000);
      setTimeout(() => {
        setLoadingCCP(false);
        setIsValidCCP(false);
        setshowCrossCCP(false);
        setBackgroundColorCPP("#8754AF");
      }, 4000);
      return cleanupCCP;
    } catch {
      setTimeout(() => {
        setLoadingCCP(false);
        setIsValidCCP(false);
        setshowCrossCCP(true);
        setBackgroundColorCPP("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
      }, 2000);
      setTimeout(() => {
        setLoadingCCP(false);
        setIsValidCCP(false);
        setshowCrossCCP(false);
        setBackgroundColorCPP("#8754AF");
      }, 4000);
    }
  };

  useEffect(() => {
    const cleanupCCP = fetchCCP(dispatchCCP);
    return cleanupCCP;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (e.currentTarget.type === "file") {
      const file = (e as ChangeEvent<HTMLInputElement>).target.files![0];
      dispatchCCP({ type: "setCCP", payload: { key: name, value: file } });
      setPatchData((prevData) => ({ ...prevData, [name]: file }));
    } else {
      dispatchCCP({ type: "setCCP", payload: { key: name, value } });
      setPatchData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between gap-4">
        <h1 className="text-[#7F38B7] self-center md:self-start text-2xl sm:text-3xl font-semibold">
          {CCPState.CCPInformation[0]?.company_name}
        </h1>
      </div>
      <section className="w-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center justify-between gap-8">
          <h2 className="text-[#7F38B7] self-center md:self-start text-lg sm:text-xl font-semibold text-justify">
            لطفا تصاویر و ویدیو معرفی مجموعه خود را در این قسمت بارگذاری نمایید.{" "}
          </h2>
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 items-center gap-2">
            <DragUpload
              lable={"تصویر 1 (تصویر اصلی)"}
              onChange={(e) => handleChange(e)}
              selectedFile={CCPState.CCP.company_image1}
              name={"company_image1"}
            />
            <DragUpload
              lable={"تصویر 2"}
              onChange={(e) => handleChange(e)}
              selectedFile={CCPState.CCP.company_image2}
              name={"company_image2"}
            />
            <DragUpload
              lable={"تصویر 3"}
              onChange={(e) => handleChange(e)}
              selectedFile={CCPState.CCP.company_image3}
              name={"company_image3"}
            />
            <DragUpload
              lable={"تصویر 4"}
              onChange={(e) => handleChange(e)}
              selectedFile={CCPState.CCP.company_image4}
              name={"company_image4"}
            />
            <DragUpload
              lable={"تصویر 5"}
              onChange={(e) => handleChange(e)}
              selectedFile={CCPState.CCP.company_image5}
              name={"company_image5"}
            />
            <DragUpload
              lable={"ویدیو معرفی"}
              onChange={(e) => handleChange(e)}
              selectedFile={CCPState.CCP.video}
              name={"video"}
            />
          </div>
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 items-center gap-2">
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <span className="text-[#717171] text-sm">تصویر 1</span>
              <LazyImage
                className={"bg-cover !h-36"}
                src={CCPState.CCPInformation[0]?.company_image1}
                alt="{تصویر 1}"
                loading={"lazy"}
                width={144}
                height={144}
              />
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <span className="text-[#717171] text-sm">تصویر 2</span>
              <LazyImage
                className={"bg-cover !h-36"}
                src={CCPState.CCPInformation[0]?.company_image2}
                alt="{تصویر 2}"
                loading={"lazy"}
                width={144}
                height={144}
              />
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <span className="text-[#717171] text-sm">تصویر 3</span>
              <LazyImage
                className={"bg-cover !h-36"}
                src={CCPState.CCPInformation[0]?.company_image3}
                alt="{تصویر 3}"
                loading={"lazy"}
                width={144}
                height={144}
              />
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <span className="text-[#717171] text-sm">تصویر 4</span>
              <LazyImage
                className={"bg-cover !h-36"}
                src={CCPState.CCPInformation[0]?.company_image4}
                alt="{تصویر 4}"
                loading={"lazy"}
                width={144}
                height={144}
              />
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <span className="text-[#717171] text-sm">تصویر 5</span>
              <LazyImage
                className={"bg-cover !h-36"}
                src={CCPState.CCPInformation[0]?.company_image5}
                alt="{تصویر 5}"
                loading={"lazy"}
                width={144}
                height={144}
              />
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <span className="text-[#717171] text-sm">ویدئو</span>
              <div className="flex h-36 rounded-xl w-full items-center justify-center">
                <Video
                  src={CCPState.CCPInformation[0]?.video!}
                  className={"rounded-xl bg-cover"}
                  alt={"ccp"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start mt-4 gap-4 xl:gap-6">
          <h2 className="text-[#7F38B7] self-center md:self-start text-lg sm:text-xl font-semibold">
            در این قسمت میتوانید توضیحات مجموعه خود را مشاهده و ویرایش نمایید.
          </h2>
          <TextArea
            Value={CCPState.CCP.description}
            TextAreaClass={"h-36 p-5 border-[#C8C8C8] text-[#303030]"}
            Name="description"
            placeholder={"توضیحات مجموعه"}
            onChange={(e) => handleChange(e)}
          />
          <div className="w-full flex flex-col lg:flex-row justify-start gap-4">
            <Label
              value="آدرس کامل"
              className="flex items-center text-[#7F38B7] font-bold w-24 xl:w-20"
            />
            <Input
              sizing="md"
              Name="address"
              type="text"
              ClassName="w-full"
              value={CCPState.CCP.address.replace(/(<([^>]+)>)/gi, "")}
              placeholder="آدرس مجموعه"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-6">
              <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-center gap-2">
                <Label
                  value="شماره تماس مجموعه"
                  className="flex items-center text-[#7F38B7] font-bold w-24"
                />
                <Input
                  sizing="md"
                  type="text"
                  Name="call_number"
                  ClassName=""
                  value={CCPState.CCP.call_number}
                  placeholder="09121234567"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-center gap-2">
                <Label
                  value="ایتا"
                  className="flex items-center text-[#7F38B7] font-bold"
                />
                <Input
                  sizing="md"
                  type="text"
                  Name="eita"
                  ClassName=""
                  value={CCPState.CCP.eita}
                  placeholder="eitaa.com/example"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-start gap-6">
              <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4">
                <Label
                  value="اینستاگرام"
                  className="flex items-center text-[#7F38B7] font-bold"
                />
                <Input
                  sizing="md"
                  type="text"
                  Name="instagram"
                  ClassName=""
                  value={CCPState.CCP.instagram}
                  placeholder="instagram.com/example"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4">
                <Label
                  value="تلگرام"
                  className="flex items-center text-[#7F38B7] font-bold"
                />
                <Input
                  sizing="md"
                  type="text"
                  Name="telegram"
                  ClassName=""
                  value={CCPState.CCP.telegram}
                  placeholder="t.me/example"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full mt-3 flex items-center justify-center lg:justify-end">
        <SubmitButton
          className="h-11 text-base flex items-center shadow-none !bg-[#8754AF] text-gray-700 hover:!bg-[#8754AF] max-sm:!px-4 w-max self-end px-8 py-2.5"
          loading={LoadingCCP}
          isValid={isValidCCP}
          showCross={showCrossCCP}
          buttonBgColor={backgroundColorCPP}
          onClick={putCCP}
          buttonText={"ثبت اطلاعات"}
        />
      </div>
    </>
  );
};

export default CCP;
