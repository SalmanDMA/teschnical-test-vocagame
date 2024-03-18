"use client";
import Image from "next/image";
import { FaPencil } from "react-icons/fa6";
import { FaPen, FaArrowRight } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { encryptDataManual } from "@/utils/changeData";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const cookies = useCookies();

  const removeAllCookies = async () => {
    const encryptedKeyDarkMode = await encryptDataManual("darkMode");
    Object.keys(cookies.get()).forEach(function (cookieName) {
      if (cookieName !== encryptedKeyDarkMode) {
        var neededAttributes = {
          path: "/",
        };
        cookies.remove(cookieName, neededAttributes);
      }
    });
    toast.success("Logout Success, Redirecting...", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  const user = useSelector((state: any) => state.users.user);
  const formik = useFormik({
    initialValues: {
      username: "",
      newPassword: "",
      oldPassword: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      phoneNumber: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  useEffect(() => {
    if (user) {
      formik.setFieldValue("username", user.username);
      formik.setFieldValue("phoneNumber", user.phoneNumber);
    }
  }, [user]);
  return (
    <main className="mb-24 mt-4 flex flex-col gap-6 px-4 md:mt-6 md:px-8 lg:px-36">
      <section className="flex justify-center rounded-md bg-primary px-6 pb-6 pt-2 dark:bg-secondary">
        <div className="flex max-w-md flex-col items-center justify-center text-center text-white">
          <h1 className=" text-2xl font-bold sm:text-3xl lg:text-5xl">LOREM</h1>
          <p>
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            sequi commodi odit omnis. Nobis...&quot;
          </p>
          <p>
            &quot;Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Eligendi optio quod nemo reiciendis impedit?&quot;
          </p>
        </div>
      </section>
      <section className="my-4 flex flex-wrap justify-center gap-6 sm:mb-20 sm:flex-nowrap sm:justify-between sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-6">
          <Image
            src="/avatar.jpg"
            alt="avatar"
            width={150}
            height={50}
            className="h-16 w-16 sm:h-20 sm:w-20"
          />
          <h3 className="h-max text-base font-bold sm:text-2xl">Noname</h3>
        </div>
        <button
          type="button"
          className="flex h-max items-center gap-2 rounded-[40px] bg-[#E3E6FD] px-6 py-4 dark:bg-[#FDF3E3] sm:px-10"
        >
          <FaPencil className="text-xl text-[#321AC7] dark:text-[#D38122]" />
          <span className=" font-bold text-[#321AC7] dark:text-[#D38122]">
            Edit Profile
          </span>
        </button>
      </section>
      <section className="flex flex-wrap gap-4 sm:flex-nowrap sm:gap-10">
        <aside className="flex h-max w-full justify-between sm:h-[800px] sm:w-[28%] sm:flex-col sm:border-r-2 sm:border-[#D1D5DB] sm:pr-10">
          <div className="flex items-center gap-2 sm:gap-6">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={150}
              height={50}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <p className="text-slate-800">Profile</p>
          </div>
          <div className="sm:border-t-2 sm:border-[#D1D5DB]">
            <button
              onClick={removeAllCookies}
              type="button"
              className="flex items-center gap-3 sm:mt-4"
            >
              <RiLogoutBoxLine className="text-xl text-[#DC2626] sm:text-2xl" />
              <span className=" text-base font-bold text-[#DC2626] sm:text-xl">
                Logout
              </span>
            </button>
          </div>
        </aside>
        <form
          onSubmit={formik.handleSubmit}
          className="flex h-max w-full flex-col gap-6 rounded-lg bg-white px-6 py-4 shadow-xl sm:w-[68%] sm:px-10 sm:py-8"
        >
          <div className="flex gap-2 border-b-2 border-[#D1D5DB] pb-6">
            <FaPen className="text-2xl sm:text-4xl" />
            <h3 className="text-xl font-bold sm:text-3xl">Edit Profile</h3>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-slate-800">
              <span>Name</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="rounded-[40px] border-2 border-[#D1D5DB] px-4 py-2 text-primary focus:outline-primary dark:text-secondary focus:dark:outline-secondary"
              id="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-start text-sm text-red-500">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-slate-800">
              <span>No Handphone</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="rounded-[40px] border-2 border-[#D1D5DB] px-4 py-2 text-primary focus:outline-primary dark:text-secondary focus:dark:outline-secondary"
              id="phoneNumber"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-start text-sm text-red-500">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="relative flex flex-col gap-2">
            <label htmlFor="oldPassword" className="text-slate-800">
              Old Password
            </label>
            <input
              className="rounded-[40px] border-2 border-[#D1D5DB] px-4 py-2 text-primary focus:outline-primary dark:text-secondary focus:dark:outline-secondary"
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              {...formik.getFieldProps("oldPassword")}
            />
            <div className="absolute right-[4%]  top-[70%] -translate-y-1/2 bg-white">
              {showOldPassword ? (
                <IoMdEyeOff
                  className="cursor-pointer text-3xl text-primary dark:text-secondary"
                  onClick={() => setShowOldPassword(false)}
                />
              ) : (
                <IoMdEye
                  className="cursor-pointer text-3xl text-primary dark:text-secondary"
                  onClick={() => setShowOldPassword(true)}
                />
              )}
            </div>
          </div>

          <div className="relative flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-slate-800">
              New Password
            </label>

            <input
              className="rounded-[40px] border-2 border-[#D1D5DB] px-4 py-2 text-primary focus:outline-primary dark:text-secondary focus:dark:outline-secondary"
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              {...formik.getFieldProps("newPassword")}
            />
            <div
              className={`absolute right-[4%]  top-[70%] -translate-y-1/2 bg-white`}
            >
              {showNewPassword ? (
                <IoMdEyeOff
                  className="cursor-pointer text-3xl text-primary dark:text-secondary"
                  onClick={() => setShowNewPassword(false)}
                />
              ) : (
                <IoMdEye
                  className="cursor-pointer text-3xl text-primary dark:text-secondary"
                  onClick={() => setShowNewPassword(true)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex max-w-max items-center gap-2 rounded-[40px] bg-[#E3E6FD] px-6 py-4 dark:bg-[#FDF3E3] sm:px-10"
          >
            <span className=" font-bold text-[#321AC7] dark:text-[#D38122]">
              Edit Profile
            </span>
            <FaArrowRight className="text-xl text-[#321AC7] dark:text-[#D38122]" />
          </button>
        </form>
      </section>
    </main>
  );
}
