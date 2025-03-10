import Link from "next/link";
import Img from "./Img";
import { Dispatch, SetStateAction } from "react";

type Props = {
  openDropDown: boolean;
  setOpenDropDown: Dispatch<SetStateAction<boolean>>;
};

export default function UserNavComp({ openDropDown, setOpenDropDown }: Props) {
  const dropdownLinks = [
    { href: "/dashboard", text: "Dashboard" },
    { href: "/settings", text: "Settings" },
  ];

  const handleDropDown = () => setOpenDropDown(!openDropDown);

  return (
    <>

      <div className="hover:bg-accent-blue absolute bottom-0 left-0 flex w-full shrink-0 items-center gap-5 rounded-br-2xl p-5 hover:*:text-white sm:relative sm:w-fit sm:!bg-transparent sm:p-0">
        <div
          role="button"
          onClick={handleDropDown}
          className="hover:border-light-gray cursor-pointer rounded-full border-5 border-transparent"
        >
          <Img
            src={"/images/onos.jpg"}
            className="border-primary h-[40px] w-[40px] rounded-full border-2 object-cover"
            alt="user image"
          />
        </div>
        <b className="text-secondary block sm:hidden">Onos Ejoor</b>

        {openDropDown && (
          <div className="divide-primary/70 shadow-story-card absolute bottom-5 left-[210px] z-10 w-45 divide-y rounded-lg bg-white sm:top-[70px] sm:-right-5 sm:bottom-auto sm:left-auto">
            <div className="grid gap-3 px-4 py-3 text-sm text-gray-900">
              <p className="hidden sm:block">Onos Ejoor</p>
              <div className="truncate font-medium">onosejoor14@gmail.com</div>
            </div>
            <ul className="text-secondary py-2 text-sm">
              {dropdownLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="py-2">
              <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
