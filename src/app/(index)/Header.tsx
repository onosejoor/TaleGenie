import { OpenIcon } from "@/components/Icons";
import Img from "@/components/Img";
import Link from "next/link";

export default function Header() {
  return (
    <header className="grid grid-cols-1 items-center gap-[50px] py-10 px-10 md:grid-cols-2 md:px-20">
      <div className="grid h-fit justify-items-center gap-7 text-center md:justify-items-start md:text-start">
        <h1 className="font-geist text-secondary xs:text-4xl font-bold md:text-5xl lg:text-6xl/[1.2]">
          <span className="text-primary font-cherry">TaleGenie</span> Where AI
          and Imagination Meet
        </h1>
        <p className="text-secondary font-geist">
          We make it simple to bring your stories to life, so you can explore
          endless worlds of imagination!
        </p>
        <Link
          href={"/create"}
          className="group bg-primary flex items-center gap-3 overflow-hidden rounded-[10px] p-3 *:transition-all *:delay-75 *:duration-200"
        >
          <span className="translate-x-5 font-medium text-white group-hover:translate-x-0 group-hover:text-white">
            Get Started
          </span>
          <span className="-translate-y-[40px] group-hover:translate-none">
            <OpenIcon />
          </span>
        </Link>
      </div>
      <Img
        src={"/images/header.svg"}
        className="h-full w-full object-cover"
        alt="header image"
      />
    </header>
  );
}
