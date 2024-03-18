"use client";
import FormAuth from "@/components/FormAuth";
import { userProfile } from "@/store/slice/userSlice";
import { encryptDataManual } from "@/utils/changeData";
import { useFormik } from "formik";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const Page = () => {
  const router = useRouter();
  const cookies = useCookies();
  const dispatch = useDispatch();
  const formik = useFormik<FormData | any>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      phoneNumber: Yup.string().required("Phone Number is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const encryptedKeyCokies = await encryptDataManual("userRegister");
        const encryptedKeyValues: Record<string, string> = {};
        for (const key in values) {
          const encryptedKey = await encryptDataManual(key);
          encryptedKeyValues[encryptedKey] = await encryptDataManual(
            values[key] as string,
          );
        }
        cookies.set(encryptedKeyCokies, JSON.stringify(encryptedKeyValues), {
          path: "/",
        });
        dispatch(userProfile(values));
        toast.success("Register Success, Redirecting...", {
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center bg-primary pb-20 pt-40 dark:bg-secondary lg:py-20">
      <Image
        src="/logo.png"
        alt="auth"
        width={300}
        height={200}
        className="absolute left-1/2 top-5 h-[100px] w-[100px] -translate-x-1/2 lg:left-10 lg:translate-x-0"
      />
      <FormAuth
        key={"register"}
        formik={formik}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setConfirmShowPassword={setShowConfirmPassword}
        includeConfirmPassword={true}
        includePhoneNumber={true}
        classContainer="flex w-full flex-col justify-center gap-2 sm:gap-6 sm:px-8 lg:px-16 max-w-2xl px-10"
        textTitle="Daftarkan Akun"
        subTitle="Daftar akun anda dengan mengisi form dibawah"
        buttonText="Daftar Sekarang"
        descriptionLink="Sudah punya akun ?"
        linkText="Login Sekarang"
        redirectLink="/auth/login"
        classInput="rounded-[40px] border-2 border-white px-6 py-[1.5rem] text-lg text-white focus:white bg-transparent placeholder:text-white"
        classContainerEyeIcon="bg-[#8988B3] px-[2rem] py-[0.5rem] rounded-[40px]"
        classEyeIcon="cursor-pointer text-4xl text-white"
        topValueContainerEyeIcon="top-[64%]"
        topValueErrorContainerEyeIcon="top-[52%]"
        classHeading="text-center text-3xl font-bold text-white sm:text-start lg:text-5xl"
        classParagraph="text-center text-white sm:text-start"
        classLabel="text-white"
        classButton="mt-4 rounded-[40px] bg-[#E5EAFD] px-6 py-4 font-bold text-black sm:mt-7 sm:px-10"
        classParagraphLink="mt-2 text-center text-white"
        classLink="font-bold text-white"
      />
    </main>
  );
};

export default Page;
