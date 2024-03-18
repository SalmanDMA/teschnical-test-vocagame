import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary px-6 py-2 pb-20 pt-8 dark:bg-secondary sm:px-10 lg:px-40">
      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={50}
        className="h-28 w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
      />
    </footer>
  );
};

export default Footer;
