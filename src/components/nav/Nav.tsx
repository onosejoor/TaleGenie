"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveClassName } from "@/app/_lib/utils";

import Img from "../Img";
import { CancelIcon, HamburgerIcon } from "../Icons";
import UserNavComp from "./UserNav";
import { LogoMobile } from "./Icons";

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);

  const isExpanded = openNav || openDropDown;

  const path = usePathname();

  const links = [
    {
      href: "/",
      text: "home",
    },
    {
      href: "/stories",
      text: "discover",
    },
    {
      href: "/create",
      text: "create",
    },
  ];

  const handleNavExpansion = () => {
    setOpenNav(false);
    setOpenDropDown(false);
  };

  return (
    <>
      {isExpanded && (
        <div
          className="bg-secondary/50 fixed inset-0 z-10 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none"
          onClick={handleNavExpansion}
        ></div>
      )}
      <nav
        suppressHydrationWarning
        className="flex items-center talegenie-container justify-between border-b border-[#D3D3D3]/50 px-10 py-[11px] lg:px-20"
      >
        <Link href={"/"} className="shrink-0">
          <Img
            src={"/images/logo.svg"}
            alt=" TaleGenie Logo"
            className="hidden h-[55px] w-fit min-w-[100px] md:block"
          />
          <LogoMobile />
        </Link>

        <div className="flex w-fit items-center gap-5">
          <button
            title="open nav menu"
            onClick={() => setOpenNav(!openNav)}
            className="block sm:hidden"
          >
            <HamburgerIcon />
          </button>

          <ul
            data-open={openNav}
            className="shadow-story-card fixed data-[open=true]:dark:bg-black/70  bottom-0 left-0 z-100 flex h-full w-[200px] -translate-x-full flex-col gap-10 rounded-tr-2xl rounded-br-2xl bg-white px-5 py-10 data-[open=true]:translate-x-0 sm:static sm:h-fit sm:w-fit sm:!translate-x-0 sm:flex-row sm:items-center sm:gap-[30px] sm:bg-transparent sm:p-0 sm:shadow-none"
          >
            <li
              onClick={handleNavExpansion}
              className="bg-secondary/5 block w-fit cursor-pointer rounded-full p-1 sm:hidden"
            >
              <CancelIcon height={40} width={40} fill="red" />
            </li>

            {links.map((link, index) => {
              const isActive =
                path === link.href || path.split("/")[1] === link.href.slice(1);
              const className = isActiveClassName(isActive);
              return (
                <li
                  key={index}
                  className={`${className} hover:before:bg-secondary relative h-fit text-lg capitalize before:absolute before:-bottom-4 before:left-0 before:block before:h-[2px] before:rounded-full before:transition-all hover:before:w-full sm:h-full sm:before:-bottom-[25px]`}
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              );
            })}
            <UserNavComp
              handleNavExpansion={handleNavExpansion}
              openDropDown={openDropDown}
              setOpenDropDown={setOpenDropDown}
            />
          </ul>
        </div>
      </nav>
    </>

    //   <nav className="flex items-center justify-between border-b border-[#D3D3D3]/50 px-20 m-5 shadow-[0px_0px_15px] shadow-secondary/10 rounded-full w-[90%] mx-auto">
    //   <Img
    //     src={"/images/logo.svg"}
    //     alt=" TaleGenie Logo"
    //     className="h-[55px] w-fit"
    //   />
    //   <ul className="font-geist flex items-center gap-[30px]">
    //     {links.map((link, index) => {
    //       const isActive = path === link.href;
    //       const className = isActive
    //         ? "font-bold border-primary text-primary"
    //         : "text-secondary/70  border-transparent  font-semibold";
    //       return (
    //         <li
    //           key={index}
    //           className={`${className} h-full border-b-2 py-5 text-lg capitalize`}
    //         >
    //           <Link href={link.href}>{link.text}</Link>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </nav>
  );
}
