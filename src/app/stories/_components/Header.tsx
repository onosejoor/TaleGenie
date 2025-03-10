"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { CancelIcon, OpenIcon, SearchIcon } from "@/components/Icons";

export default function StoriesHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("query");

  const [searchQuery, setSearchQuery] = useState(queryParam ?? "");

  function clearSearchQuery() {
    const urlQuery = new URLSearchParams(searchParams.toString());
    urlQuery.delete("query");
    router.replace(`/stories?${urlQuery}`);
    setSearchQuery("");
    return;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/stories?keyword=${searchQuery}`);
    }
    return;
  }
  return (
    <header className="relative flex h-fit flex-col gap-10 bg-[url(/images/stories-header.png)] bg-cover bg-no-repeat px-20 py-10 md:h-[600px]">
      <div className="flex flex-col justify-center gap-5 text-center pt-10">
        <h1 className="xs:text-4xl font-cherry mx-auto w-full text-center text-3xl font-bold text-white md:w-[80%] md:text-6xl/[1.2]">
          Search for a new Imagination Now!
        </h1>
        <p className="text-white">
          Let our smart search navigate you through imaginative, tech-driven
          tales.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto my-5 flex w-fit *:transition-all flex-col items-center gap-7"
      >
        <div className="has-focus:ring-accent-blue relative flex items-center gap-3 rounded-xl border-2 border-transparent bg-white px-5 py-3 transition-all has-focus:ring-4">
          <SearchIcon />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none outline-0 placeholder:text-base transition-all md:focus:w-[500px] md:w-[450px]"
            placeholder="Search For A Story"
          />
          {searchQuery && (
            <CancelIcon
              className="fill-red-500 absolute right-5"
              onClick={clearSearchQuery}
              cursor={"pointer"}
            />
          )}
        </div>
        <button className="group bg-primary flex w-fit items-center gap-3 overflow-hidden rounded-[10px] border-2 border-white p-3 *:transition-all *:delay-75 *:duration-200">
          <span className="translate-x-5 font-medium text-white group-hover:translate-x-0 group-hover:text-white">
            Search
          </span>
          <span className="-translate-y-[40px] group-hover:translate-none">
            <OpenIcon />
          </span>
        </button>
      </form>
    </header>
  );
}
