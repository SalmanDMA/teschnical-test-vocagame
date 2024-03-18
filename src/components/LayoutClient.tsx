"use client";
import React from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import ToggleSwitcher from "./ToggleSwitcher";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const LayoutClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const authComponents = "/auth";
  const loginComponent = "/auth/login";

  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto max-w-[1440px]`}>
        <Provider store={store}>
          {!pathName.startsWith(loginComponent) && <ToggleSwitcher />}
          {!pathName.startsWith(authComponents) && <Navbar />}
          {children}
          {!pathName.startsWith(authComponents) && <Footer />}
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
};

export default LayoutClient;
