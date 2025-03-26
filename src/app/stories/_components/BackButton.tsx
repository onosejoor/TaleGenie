"use client";
import { ArrowRightIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group border-primary dark:bg-primary dark:text-white dark:border-secondary flex w-fit items-center gap-3 overflow-hidden rounded-[10px] border-2 bg-white p-3 py-2 *:transition-all *:delay-75 *:duration-200"
    >
      <span className="*:fill-primary dark:*:fill-white -translate-y-[40px] rotate-180 group-hover:translate-none">
        <ArrowRightIcon />
      </span>
      <span className="text-secondary xs:text-base text-xs -translate-x-5 font-medium group-hover:translate-x-0">
        Go Back
      </span>
    </button>
  );
};

export default BackButton