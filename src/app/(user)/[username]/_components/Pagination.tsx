"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  numberOfDocs: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

export default function Pagination({
  numberOfDocs,
  currentPage,
  setPage,
}: Props) {
  const handleNextPage = () => setPage(currentPage + 1);
  
  const handlePreviousPage = () => setPage(currentPage - 1);

  if (numberOfDocs < 6 && currentPage === 1) {
    return;
  }

  return (
    <div className="my-10 flex items-center justify-center gap-5">
      <button
        className="rounded-[10px] dark:bg-accent-blue bg-blue-100 px-5 py-2"
        onClick={handlePreviousPage}
      >
        « Previous
      </button>
      <b className="text-base text-gray-950 dark:text-white">{currentPage}</b>

      <button
        className="rounded-[10px] px-5 py-2 hover:bg-blue-500 dark:bg-blue-50 hover:text-white dark:text-gray-800"
        onClick={handleNextPage}
      >
        Next »
      </button>
    </div>
  );
}
