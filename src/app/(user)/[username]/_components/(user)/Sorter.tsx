"use client";

import { useState } from "react";

import { ArrowDownIcon } from "@/components/Icons";
import { usePathname, useRouter } from "next/navigation";

export default function StorySorter() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [sortByField, setSortByField] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleMenu = () => setOpenDropDown(!openDropDown);

  const handleSorterClick = (sorter: string) => {
    setOpenDropDown(false);
    setSortByField(sorter);

    if (sorter.trim()) {
      router.replace(`${pathname}?status=${sorter}`);
    }
  };

  const handleReset = () => {
    router.replace(pathname);
    setSortByField("");
    setOpenDropDown(false);
    return;
  };

  const sorters = ["published", "saved"];

  return (
    <div className="relative">
      <button
        onClick={handleMenu}
        className="text-secondary shadow-settings flex items-center gap-2 rounded-[10px] p-3 capitalize hover:opacity-80"
      >
        {sortByField ? sortByField : "Filter"}
        <span
          className={`${openDropDown ? "rotate-180" : ""} *:fill-secondary`}
        >
          <ArrowDownIcon />
        </span>
      </button>

      {openDropDown && (
        <div className="animate-in zoom-in-95 shadow-settings absolute top-15 -left-[50px] z-1 grid w-fit gap-5 rounded-md bg-white p-5 py-3 duration-200 ease-out *:text-left">
          {sorters.map((sorter, index) => (
            <button
              onClick={() => handleSorterClick(sorter)}
              key={`${sorter}-${index}`}
              className="hover:text-accent-blue text-secondary/80 w-full whitespace-nowrap capitalize"
            >
              {sorter}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="hover:text-accent-blue w-full whitespace-nowrap text-red-500 capitalize"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
