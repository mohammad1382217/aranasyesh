import React from "react";
import ImageHomeHeaderLeft2 from "../assets/images/coffee.webp";
import ImageHomeHeaderRight from "../assets/images/coffee2.webp";
import ImageHomeHeaderLeft1 from "../assets/images/dentist.webp";
const LazyImage = React.lazy(() => import("../components/LazyImage"));

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center w-full h-full bg-[#F5F5F5] gap-10">
      <section className="container mx-auto my-10 flex flex-col items-center md:!flex-row-reverse p-10 w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-8">
        <div className="w-full flex flex-col justify-center lg:justify-start items-start text-justify gap-8 md:gap-6">
          <h1 className="text-[#7F38B7] self-center md:self-start text-3xl sm:text-4xl font-semibold">
            درباره ما
          </h1>
          <div className="flex justify-center w-full">
            <section className="w-2/3">
            <LazyImage
              src={ImageHomeHeaderRight}
              className="rounded-t-lg"
              alt="ImageHomeHeaderRight"
              width={"66.666667%"}
              height={"100%"}
            />
            </section>
            <section className="flex flex-col w-1/3">
              <LazyImage
                src={ImageHomeHeaderLeft1}
                className="rounded-t-lg"
                alt="ImageHomeHeaderLeft1"
                width={"100%"}
                height={"100%"}
              />
              <LazyImage
                src={ImageHomeHeaderLeft2}
                className="rounded-t-lg"
                alt="ImageHomeHeaderLeft2"
                width={"100%"}
                height={"100%"}
              />
            </section>
          </div>
          <p lang="fa" className="text-base font-light text-[#303030] text-justify">
            مجوعه آران آسایش آفرینان متشکل از جمعی از پزشکان و اساتید دانشگاه و
            صاحبان کسب و کار از سال 1397 با مدیریت آقای محمدرضا مرادی مشغول
            فعالیت است. این مجموعه با راه‌اندازی شبکه سراسری تخفیف ایران با
            صرفه‌جویی در هزینه‌های جاری خانوار و حمایت از اقتصاد خانواده، مصداق
            بارزی از اقتصاد مقاومتی ارائه نموده است. امروزه با توجه به شرایط
            اقتصادی حاکم بر کشور، پس‌انداز و صرفه‌جویی در هزینه‌های جاری و ضروری
            خانواده‌ها بیش از همیشه مورد توجه اقشار مختلف جامعه و سرپرست
            خانواده‌ها است. از طرفی صاحبان مشاغل و خدمات گوناگون نیز با همین
            رکود اقتصادی و کمرشکنی روبرو هستند که در بسیاری از مواقع حاضرند به
            نفع مشتری از قسمتی از سود خود چشم پوشی کرده و با دید قناعت به حداقل
            سود، ضمن خروج از رکود و بحران مالی زمینه جذب مشتری و بازار جدید را
            فراهم سازند. متخصصان مجموعه آران آسایش آفرینان با مطالعه روی معضل
            رکود و با هدف خروج از آن دور هم گرد آمده و با جمع‌آوری نتایج خود و
            تحقیقات میدانی، به راهکار این معضل دست پیدا کردند. یکی از نتایج جمع
            شدن متخصصان بازار دور هم، شروع به کار تیم آران آسایش آفرینان است.
            گره کار این مشکل در نظام کار آمد و هدفمند امروزی به دست صاحبان خدمات
            یا کالاها به وسیله تکنیکی به نام تخفیف باز می‌شود. در حقیقت ، نظام
            تخفیف در کسب و کار باعث توسعه و رونق اقتصادی، معرفی و اطلاع‌رسانی
            برترین‌های صاحبان مشاغل و خدمات گوناگون در محدوده‌های جغرافیایی
            شهرها و استان‌های کشور است که در نتیجه رفاه بیشتری برای تمامی مردم
            را به دنبال خواهد داشت. استفاده از شیوه اقتصادی تخفیف که بیشتر به
            صورت غیر رسمی و با مشارکت داوطلبانه فراگیر مردم و صاحبان صنایع و
            خدمات امکان پذیر است که اگر از سوی حاکمیت مورد اهتمام جدی قرار گیرد،
            در حقیقت می‌تواند حلال بسیاری از مشکلات اقتصادی اقشار ضعیف جامعه
            باشد. در شرایط کنونی علی‌رغم تمام مشکلات موجود با استقبال گسترده
            مردم و صاحبان حرف و خدمات مختلف، شبکه سراسری تخفیف در حال گسترش روز
            افزون است. مجموعه آران آسایش آفرینان با عزم ملي و مديريت جهادي در
            عرصه توسعه اقتصادي به عنوان پيشگام قدم در اين راه دشوار گذاشته است و
            در آینده‌ای نزدیک با توکل به خداوند متعال هر هموطن ایرانی یک تخفیف
            کارت آران آسایش را خواهد داشت.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
