import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ToggleSwitcher from "./ToggleSwitcher";
import Link from "next/link";
import type { IFormAuth } from "@/types/IFormAuth";

const FormAuth = ({
  formik,
  showPassword,
  setShowPassword,
  includePhoneNumber,
  includeConfirmPassword,
  showConfirmPassword,
  setConfirmShowPassword,
  includeToggleSwitch,
  classContainer,
  textTitle,
  subTitle,
  buttonText,
  descriptionLink,
  redirectLink,
  linkText,
  classInput,
  classContainerEyeIcon,
  classEyeIcon,
  topValueContainerEyeIcon,
  topValueErrorContainerEyeIcon,
  classHeading,
  classLabel,
  classParagraph,
  classLink,
  classButton,
  classParagraphLink,
}: IFormAuth) => {
  return (
    <section className={classContainer}>
      <div className="relative">
        {includeToggleSwitch && (
          <div className="absolute -right-8 -top-20">
            <ToggleSwitcher />
          </div>
        )}
        <h1 className={classHeading}>{textTitle}</h1>
      </div>
      <p className={classParagraph}>{subTitle}</p>
      <form
        className="mt-4 flex w-full flex-col gap-4 sm:mt-0"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className={classLabel}>
            <span>Username</span>
            <span className="text-red-500 dark:text-red-900">*</span>
          </label>
          <input
            type="text"
            className={classInput}
            id="username"
            placeholder="Ketik username anda disini..."
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-start text-sm text-red-500 dark:text-red-900">
              {formik.errors.username}
            </p>
          )}
        </div>

        {includePhoneNumber && (
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className={classLabel}>
              <span>Phone Number</span>
              <span className="text-red-500 dark:text-red-900">*</span>
            </label>
            <input
              type="text"
              className={classInput}
              id="phoneNumber"
              placeholder="Nomor handphone anda"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-start text-sm text-red-500 dark:text-red-900">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>
        )}

        <div className="relative flex flex-col gap-2">
          <label htmlFor="password" className={classLabel}>
            <span>Password</span>
            <span className="text-red-500 dark:text-red-900">*</span>
          </label>
          <input
            className={classInput}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Masukkan password anda"
            {...formik.getFieldProps("password")}
          />
          <div
            className={`absolute right-[5%]  ${formik.errors.password && formik.touched.password ? `${topValueErrorContainerEyeIcon}` : `${topValueContainerEyeIcon}`} -translate-y-1/2 ${classContainerEyeIcon}`}
          >
            {showPassword ? (
              <IoMdEyeOff
                className={classEyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoMdEye
                className={classEyeIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {formik.touched.password && formik.errors.password && (
            <p className="text-start text-sm text-red-500 dark:text-red-900">
              {formik.errors.password}
            </p>
          )}
        </div>

        {includeConfirmPassword && (
          <div className="relative flex flex-col gap-2">
            <label htmlFor="confirmPassword" className={classLabel}>
              <span>Confirm Password</span>
              <span className="text-red-500 dark:text-red-900">*</span>
            </label>
            <input
              className={classInput}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Masukkan kembali password anda"
              {...formik.getFieldProps("confirmPassword")}
            />

            {setConfirmShowPassword && (
              <div
                className={`absolute right-[5%]  ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? `${topValueErrorContainerEyeIcon}`
                    : `${topValueContainerEyeIcon}`
                } -translate-y-1/2 ${classContainerEyeIcon}`}
              >
                {showConfirmPassword ? (
                  <IoMdEyeOff
                    className={classEyeIcon}
                    onClick={() => setConfirmShowPassword(false)}
                  />
                ) : (
                  <IoMdEye
                    className={classEyeIcon}
                    onClick={() => setConfirmShowPassword(true)}
                  />
                )}
              </div>
            )}

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-start text-sm text-red-500 dark:text-red-900">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        )}

        <button type="submit" className={classButton}>
          {formik.isSubmitting ? "Loading..." : `${buttonText}`}
        </button>
      </form>
      <p className={classParagraphLink}>
        {descriptionLink}{" "}
        <Link href={redirectLink} className={classLink}>
          {linkText}
        </Link>
      </p>
    </section>
  );
};

export default FormAuth;
