import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import bg_admin from "../assets/images/bg-admin.webp";
const FlowbiteListGroup = React.lazy(() => import("../components/ListGroup"));

export const List = [
  // { title: "اطلاعات مجموعه", link: "/CCP/CCP" },
  { title: "تأیید کد تخفیف", link: "/CCP/ConfirmCode" },
  { title: "سوابق تخفیف", link: "/CCP/DiscountHistory" },
  { title: "لیست تراکنش‌ها", link: "/CCP/SelectDate" },
  { title: "خروج از پنل مدیریت", link: "/" },
];

const RootLayoutAdmin = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${bg_admin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen min-h-screen overflow-x-hidden flex flex-col py-8"
    >
      <div className="flex flex-col container mx-auto px-6 lg:px-8 gap-8">
        <section className="w-full flex px-2 lg:px-6">
          <h1 className="text-[#303030] self-center md:self-start text-2xl sm:text-3xl font-semibold">
            پنل مدیریت مجموعه
          </h1>
        </section>
        <div className="flex flex-col xl:flex-row container h-full mx-auto px-6 lg:px-8 gap-8">
          <section className="flex justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <FlowbiteListGroup List={List} />
            </Suspense>
          </section>
          <section className="bg-white flex flex-col p-6 lg:p-8 rounded-2xl w-full sm:flex-col items-center justify-between gap-5">
            <Outlet />
          </section>
        </div>
      </div>
    </section>
  );
};

export default RootLayoutAdmin;
