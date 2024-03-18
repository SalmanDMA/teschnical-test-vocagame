"use client";
import FormAuth from "@/components/FormAuth";
import { userProfile } from "@/store/slice/userSlice";
import { decryptDataManual, encryptDataManual } from "@/utils/changeData";
import { useFormik } from "formik";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Page = () => {
  const router = useRouter();
  const cookies = useCookies();
  const dispatch = useDispatch();

  const formik = useFormik<FormData | any>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const encryptedKeyCokies = await encryptDataManual("userLogin");
        const encryptedKeyValues: Record<string, string> = {};
        for (const key in values) {
          const encryptedKey = await encryptDataManual(key);
          encryptedKeyValues[encryptedKey] = await encryptDataManual(
            values[key] as string,
          );
        }
        const expiredInOneMinute = new Date(
          new Date().getTime() + 1 * 60 * 1000,
        );
        cookies.set(encryptedKeyCokies, JSON.stringify(encryptedKeyValues), {
          path: "/",
          expires: expiredInOneMinute,
        });
        dispatch(userProfile(values));
        toast.success("Login Success, Redirecting...", {
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
          router.push("/");
          resetForm();
        }, 1500);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen min-w-full justify-center">
      <section className="relative hidden flex-col items-center justify-center gap-10 bg-primary dark:bg-secondary sm:flex sm:w-[50%] lg:w-[55%]">
        <Image
          src={"/auth.svg"}
          alt="logo"
          width={100}
          height={100}
          className="h-[350px] w-[250px]"
          priority
        />
        <div className="relative flex max-w-md flex-col items-center justify-center px-8 text-center text-white lg:max-w-lg">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-5xl">
            LOREM
          </h1>
          <p>
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            sequi commodi odit omnis. Nobis...&quot;
          </p>
          <p>
            &quot;Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Eligendi optio quod nemo reiciendis impedit?&quot;
          </p>

          <div className="absolute  -bottom-8 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
            {[0, 1, 2, 3].map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-3 w-3 rounded-full border-2 border-white ${
                  index === 0 ? "bg-white" : ""
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      <FormAuth
        key={"login"}
        formik={formik}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        classContainer="relative flex w-full flex-col justify-center gap-2 px-10 sm:w-[50%] sm:gap-6  sm:px-8  lg:w-[45%] lg:px-16"
        textTitle="Silahkan Login"
        includeToggleSwitch={true}
        subTitle="Masukkan Username dan password anda untuk masuk"
        buttonText="Masuk Sekarang"
        descriptionLink="Belum punya akun ?"
        linkText="Daftar Sekarang"
        redirectLink="/auth/register"
        classInput="rounded-[40px] border-2 border-[#D1D5DB] px-6 py-3 text-lg text-primary focus:outline-primary dark:text-secondary focus:dark:outline-secondary placeholder:text-primary dark:placeholder:text-secondary"
        classContainerEyeIcon="bg-white"
        classEyeIcon="cursor-pointer text-4xl text-primary dark:text-secondary"
        topValueErrorContainerEyeIcon="top-[52%]"
        topValueContainerEyeIcon="top-[67%]"
        classHeading="text-center text-3xl font-bold text-primary dark:text-secondary sm:text-start lg:text-5xl"
        classParagraph="text-center text-slate-800 sm:text-start"
        classLabel="text-slate-800"
        classButton="mt-4 rounded-[40px] bg-[#E3E6FD] px-6 py-4 font-bold text-[#321AC7] dark:bg-[#FDF3E3] dark:text-[#D38122] sm:mt-7 sm:px-10"
        classParagraphLink="mt-2 text-center text-slate-800"
        classLink="font-bold text-primary dark:text-secondary"
      />
    </main>
  );
};

export default Page;
