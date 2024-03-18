export interface IFormAuth {
  formik: any;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  includePhoneNumber?: boolean;
  includeConfirmPassword?: boolean;
  showConfirmPassword?: boolean;
  setConfirmShowPassword?: (value: boolean) => void;
  includeToggleSwitch?: boolean;
  classContainer: string;
  textTitle: string;
  subTitle: string;
  buttonText: string;
  descriptionLink: string;
  redirectLink: string;
  linkText: string;
  classInput: string;
  classContainerEyeIcon: string;
  classEyeIcon: string;
  topValueContainerEyeIcon: string;
  topValueErrorContainerEyeIcon: string;
  classLabel: string;
  classParagraph: string;
  classHeading: string;
  classButton: string;
  classParagraphLink: string;
  classLink: string;
}
