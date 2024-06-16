import React from "react";
import coffee from "../assets/images/coffee.webp";
const LazyImage = React.lazy(() => import("../components/LazyImage"));

const OurHistory = () => {
  return (
    <div className="w-full h-full bg-[#F5F5F5]">
      <div className="container  mx-auto flex flex-col py-7 lg:py-4 my-10 px-4 lg:flex-col w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-4">
        <div className="w-full flex justify-center lg:justify-start items-start my-4 lg:my-2 px-4 lg:px-16 lg:mt-10">
          <h1 className="text-[#7F38B7] text-2xl sm:text-4xl font-semibold  ">
            تاریخچه آران آسایش
          </h1>
        </div>
        <div className="flex justify-between items-center flex-col lg:flex-row">
          <div className="w-full lg:w-6/12 px-7 md:px-0 lg:p-5">
            <LazyImage
              className="w-full md:h-80 lg:h-72"
              src={coffee}
              alt="عکس کافه"
              width={288}
              height={288}
            />
          </div>
          <div className="lg:w-7/12 p-7 md:px-11 lg:p-5">
            <p lang="fa" className="text-base font-light text-[#303030] text-justify md:text-sm lg:text-sm xl:text-base">
              مجوعه آران آسایش آفرینان متشکل از جمعی از پزشکان و اساتید دانشگاه
              و صاحبان کسب و کار از سال 1397 با مدیریت آقای محمدرضا مرادی مشغول
              فعالیت است. این مجموعه با راه‌اندازی شبکه سراسری تخفیف ایران با
              صرفه‌جویی در هزینه‌های جاری خانوار و حمایت از اقتصاد خانواده،
              مصداق بارزی از اقتصاد مقاومتی ارائه نموده است.
            </p>
            <p lang="fa" className="text-base font-light text-[#303030] text-justify md:text-sm lg:text-sm xl:text-base mt-5 lg:mt-6 xl:mt-2">
              امروزه با توجه به شرایط اقتصادی حاکم بر کشور، پس‌انداز و صرفه‌جویی
              در هزینه‌های جاری و ضروری خانواده‌ها بیش از همیشه مورد توجه اقشار
              مختلف جامعه و سرپرست خانواده‌ها است. از طرفی صاحبان مشاغل و خدمات
              گوناگون نیز با همین رکود اقتصادی و کمرشکنی روبرو هستند که در
              بسیاری از مواقع حاضرند به نفع مشتری از قسمتی از سود خود چشم پوشی
              کرده و با دید قناعت به حداقل سود، ضمن خروج از رکود و بحران مالی
              زمینه جذب مشتری و بازار جدید را فراهم سازند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
