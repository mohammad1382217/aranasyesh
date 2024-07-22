import React from "react";
import { Link } from "react-router-dom/dist";
import bazar from "../assets/svg/bazar.svg";
import eitaa from "../assets/svg/eitaa.svg";
import logo from "../assets/svg/logo-orginal.svg";
import qr_code from "../assets/images/aranasaysh-app-download.webp";

const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography")
);
const Button = React.lazy(
  () => import("@material-tailwind/react/components/Button")
);
const HiDownload = React.lazy(() => import("../components/icons/Hidownload"));
const LazyImage = React.lazy(() => import("./LazyImage"));

const FooterWithSocialLinks = () => {
  const LINKS = [
    {
      title: "همکاری با ما",
      items: [
        { item: "زیر مجموعه شدن", link: "WorkWithUs#subset" },
        { item: "تبلیغات", link: "WorkWithUs#adertising" },
        { item: "خدمات ما", link: "WorkWithUs#servies" },
      ],
    },
    {
      title: "ارتباط با ما",
      items: [
        { item: "درباره ما", link: "AboutUs" },
        { item: "تاریخچه شرکت", link: "OurHistory" },
        { item: "اهداف شرکت", link: "OurGoals" },
      ],
    },
    {
      title: "بیشتر",
      items: [
        { item: "سؤالات متداول", link: "Questions" },
        { item: "راهنمای خرید کارت", link: "BuySubscription" },
        { item: "وبلاگ", link: "Blog" },
      ],
    },
  ];

  const openInNewTab = (url: string) => {
    // Check if the URL starts with "http://" or "https://"
    const regex = /^https?:\/\//i;
    if (!regex.test(url)) {
      // If not, add "http://" to the beginning of the URL
      url = `http://${url}`;
    }

    // Open the URL in a new tab
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <footer className="w-full">
      <section className="bg-[#ECECEC] w-full flex items-center justify-center py-6 lg:py-4">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col 2xl:flex-row justify-between gap-y-6 gap-x-20 py-8">
            <div className="w-full 2xl:max-w-80 flex flex-col items-center md:items-start justify-center gap-2">
              <div className="md:w-full flex items-center justify-center gap-2">
                <LazyImage
                  loading="eager"
                  className="xl:!w-[79px] xl:!h-[102px] !w-[43px] !h-[56px]"
                  src={logo}
                  alt={"logo"}
                  width={43}
                  height={56}
                />
                <Typography
                  variant="h2"
                  className="text-2xl sm:text-3xl 2xl:text-2xl font-semibold text-[#8754AF]"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  آران آسایش آفرینان{" "}
                </Typography>
              </div>
              <p
                role="text"
                lang="fa"
                className="text-base font-light text-[#374151] text-justify"
              >
                مجموعه آران آسایش آفرینان متشکل از جمعی از پزشکان و اساتید
                دانشگاه و صاحبان کسب و کار از سال 1397 با مدیریت آقای محمدرضا
                مرادی مشغول فعالیت است.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center lg:w-full gap-y-8">
              <div className="grid grid-cols-3 justify-between gap-2 gap-y-8 w-full lg:w-auto xl:gap-6 xl:self-center self-start">
                {LINKS.map(({ title, items }) => (
                  <ul
                    key={title}
                    className="flex flex-col items-center justify-center lg:items-start"
                  >
                    <li
                      color="blue-gray"
                      className="mb-3 text-base xl:text-lg font-semibold text-[#303030]"
                    >
                      {title}
                    </li>
                    {items.map((link) => (
                      <li key={link.item}>
                        <Link
                          to={link.link}
                          color="gray"
                          className="block antialiased font-sans text-gray-700 py-1.5 xs:py-2 xs:text-[13px] text-base font-normal transition-colors hover:text-blue-gray-900 items-center lg:items-start"
                        >
                          {link.item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <div className="flex items-center xs:justify-between">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="block antialiased  mb-5 -mt-4 text-base xl:text-lg font-bold text-[#303030]">
                    دریافت اپلیکیشن
                  </h2>
                  <Link
                    to={"https://api.aranasayesh.ir/app/download/"}
                    className="flex items-center justify-center shadow-none !bg-transparent text-gray-700 hover:!bg-transparent sm:!px-4 gap-1"
                  >
                    <HiDownload className="w-[19px] h-[19px]" color="#7F38B7" />
                    <span className="block antialiased text-gray-700 text-sm lg:text-lg font-normal transition-colors bg-transparent w-max">
                      دانلود مستقیم
                    </span>
                  </Link>
                  <Button
                    disabled={true}
                    className="flex items-center shadow-none !bg-transparent text-gray-700 hover:!bg-transparent max-sm:!px-4"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <LazyImage
                      loading="lazy"
                      src={bazar}
                      className="!w-8 !h-8 sm:w-6 sm:h-6 ml-1"
                      width={32}
                      height={32}
                      alt="bazar"
                    />
                    <span className="block antialiased text-gray-700 xs:!text-sm text-base font-normal transition-colors bg-transparent">
                      دانلود از کافه بازار
                    </span>
                  </Button>
                </div>
                <LazyImage
                  loading="lazy"
                  src={qr_code}
                  className="!w-40 !h-40 rounded-2xl"
                  width={160}
                  height={160}
                  alt="qr_code"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F4F4F4] flex items-center justify-center !py-6 lg:py-4">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full flex flex-col justify-between items-center md:flex-row">
            <h2 className="mb-5 text-center font-light text-[#4B5563] xl:mb-0">
              کلیه حقوق این وبسایت متعلق به آران آسایش آفرینان است.
            </h2>
            <div className="flex gap-4 text-purple-500 sm:justify-center items-center">
              <span
                onClick={() => openInNewTab("https://eitaa.com/aranasayesh")}
                className="block antialiased py-1.5 xs:!text-sm text-base font-normal hover:text-blue-gray-900 items-center lg:items-start opacity-80 transition-opacity hover:opacity-100 cursor-pointer"
              >
                <LazyImage
                  loading="lazy"
                  src={eitaa}
                  className="!w-6 !h-6"
                  alt="eitaa"
                  width={24}
                  height={24}
                />
              </span>
              <span
                onClick={() =>
                  openInNewTab(
                    "https://www.instagram.com/aranasayesh.ir?igsh=bjh0MG92ZnBpaHNx"
                  )
                }
                className="block antialiased py-1.5 xs:!text-sm text-base font-normal hover:text-blue-gray-900 items-center lg:items-start opacity-80 transition-opacity hover:opacity-100 cursor-pointer"
              >
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default FooterWithSocialLinks;
