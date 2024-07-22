import React, { Suspense } from "react";
import "./globals.scss";
import Provider from "./api/Provider";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
const Header = React.lazy(() => import("./components/Header"));
const FooterWithSocialLinks = React.lazy(() => import("./components/footer"));

const RootLayout: React.FC = () => {
  return (
    <Provider>
      <section className="w-full min-h-screen h-full">
        <Suspense
          fallback={<Skeleton height={164} className="w-full h-full" />}
        >
          <Header />
        </Suspense>

        <main className="flex flex-col justify-center items-center h-full">
          <ScrollRestoration />
          <Outlet />
        </main>

        <FooterWithSocialLinks />
      </section>
    </Provider>
  );
};

export default RootLayout;
