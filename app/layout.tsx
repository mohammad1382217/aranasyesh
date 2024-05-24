import React from "react";
import "./globals.scss";
import Provider from "./api/Provider";
import UserProvider from "./api/Slices/UserSlice/userProvider";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import FooterWithSocialLinks from "./components/footer";

const RootLayout: React.FC = () => {
  return (
    <UserProvider>
      <Provider>
        <section className="w-full min-h-screen h-full">
          <Header />

          <main className="flex flex-col justify-center items-center h-full">
            <ScrollRestoration />
            <Outlet />
          </main>

          <FooterWithSocialLinks />
        </section>
      </Provider>
    </UserProvider>
  );
};

export default RootLayout;