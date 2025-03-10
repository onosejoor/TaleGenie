import Link from "next/link";
import Img from "./Img";
import { LightIcon, MoonIcon, SystemIcon } from "./Icons";

const footerLinks = [
  { href: "/stories", text: "Explore Stories" },
  { href: "/create", text: "Create" },
  { href: "/signin", text: "Sign In" },
  { href: "mailto: onosejoor14@gmail.com", text: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-accent-blue/5 mt-10  px-5 sm:px-10 md:px-20">
      <div className="mx-auto grid w-full gap-5 py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <Img
              src="/images/logo.svg"
              className="h-[55px] w-fit"
              alt="TaleGenie Logo"
            />
          </Link>
          <ul className="text-secondary mb-6 flex flex-wrap items-center gap-5 text-base font-medium sm:mb-0">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="hover:underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 w-full border-[#dadada] sm:mx-auto lg:my-8" />
        <div className="flex items-center justify-between">
          <span className="block text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:underline">
              TaleGenie
            </Link>
            . All Rights Reserved.
          </span>
          <div className="border-secondary ml-auto flex w-fit items-center gap-5 rounded-full border p-2">
            <SystemIcon />
            <LightIcon />
            <MoonIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
