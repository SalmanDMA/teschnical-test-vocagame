import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-primary dark:bg-secondary">
      <div className="flex items-center justify-between px-6 py-2 sm:px-10 lg:px-40">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={50}
          className="h-16 w-16 sm:h-20 sm:w-20"
        />
        <Image
          src="/avatar.jpg"
          alt="avatar"
          width={150}
          height={50}
          className="h-16 w-16 sm:h-20 sm:w-20"
        />
      </div>
      <hr className="pb-8" />
    </nav>
  );
};

export default Navbar;
