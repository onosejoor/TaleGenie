"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { LightIcon, MoonIcon, SystemIcon } from "../Icons";

const themes = [
  {
    value: "system",
    icon: <SystemIcon />,
  },
  {
    value: "light",
    icon: <LightIcon />,
  },
  {
    value: "dark",
    icon: <MoonIcon />,
  },
];

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <div className="bg-secondary/10 dark:bg-white/5 p-[5px] xs:ml-auto overflow-hidden flex w-fit items-center rounded-full">
      {themes.map((userTheme, index) => {
        const isActive = userTheme.value === theme;
        return (
          <button
            key={index}
            className={`p-2 ${isActive ? "bg-light-gray dark:*:fill-white dark:bg-light-gray/50" : ""} rounded-full`}
            onClick={() => setTheme(userTheme.value)}
          >
            {userTheme.icon}
          </button>
        );
      })}
    </div>
  );
}
