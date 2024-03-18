"use client";
import { encryptDataManual } from "@/utils/changeData";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

const ToggleSwitcher = () => {
  const [isChecked, setIsChecked] = useState(false);
  const cookies = useCookies();

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);

    const encryptedData = await encryptDataManual(String(!isChecked));
    const encryptedKeyDarkMode = await encryptDataManual("darkMode");
    const encryptedKeyLightMode = await encryptDataManual("lightMode");

    if (!cookies.get(encryptedKeyDarkMode)) {
      cookies.remove(encryptedKeyLightMode, { path: "/" });
      const encryptedKeyDarkModeValue = {
        encryptedKeyDarkMode: encryptedData,
      };
      cookies.set(
        encryptedKeyDarkMode,
        JSON.stringify(encryptedKeyDarkModeValue),
        {
          path: "/",
          expires: 86400,
        },
      );
    } else {
      cookies.remove(encryptedKeyDarkMode, { path: "/" });
      const encryptedKeyLightModeValue = {
        encryptedKeyLightMode: encryptedData,
      };
      cookies.set(
        encryptedKeyLightMode,
        JSON.stringify(encryptedKeyLightModeValue),
        {
          path: "/",
        },
      );
    }
  };

  const fetchDataChecked = async () => {
    const encryptedKeyDarkMode = await encryptDataManual("darkMode");
    const darkMode = cookies.get(encryptedKeyDarkMode);
    if (darkMode) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    fetchDataChecked();
  }, []);

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isChecked]);

  return (
    <div className="mx-4 my-2 flex items-center justify-end">
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="flex items-center text-lg font-bold text-primary dark:text-slate-800">
          Blue
        </span>
        <div className="relative  mx-2 h-14 w-14 rounded-full border-2 border-primary p-2 dark:border-secondary">
          <span
            className={`absolute left-1/2 top-1/2 flex h-4 w-[30px] -translate-x-1/2 -translate-y-1/2 items-center rounded-full p-1 duration-200 ${
              isChecked ? "bg-secondary" : "bg-primary"
            }`}
          >
            <span
              className="dot h-5 w-5 -translate-x-[6px]  rounded-full border-2 border-solid  border-primary 
                bg-white duration-200 dark:translate-x-[9px] dark:border-secondary"
            ></span>
          </span>
        </div>
        <span className="flex items-center text-lg font-bold text-slate-800 dark:text-secondary">
          Orange
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitcher;
