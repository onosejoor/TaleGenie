"use client";

import Link from "next/link";
import dayjs from "dayjs";

import { ArrowRightIcon } from "@/components/Icons";
import Img from "@/components/Img";

import StorySettings from "./StorySettings";
import useSWR, { KeyedMutator } from "swr";
import { useState } from "react";
import Pagination from "../Pagination";
import { useSearchParams } from "next/navigation";
import { fetcher, Response } from "@/app/_lib/utils";
import EmptyState from "../EmptyState";
import LoaderCard from "@/components/loaders/StoryLoader";
import StoryError from "@/components/StoryError";

type StoryProps = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  slug: string;
  coverImage: string;
  status: Status;
  genres: string[];
  mutate: KeyedMutator<Response>;
};

export default function UserStories({ userId }: { userId: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();

  const sortedValue = searchParams.get("status");

  const queryString = buildQueryParams(currentPage, sortedValue!);

  const { data, isLoading, error, mutate } = useSWR<Response>(
    [`/api/user/stories?${queryString}&limit=6`, userId],
    fetcher,
  );

  if (error) {
    return (
      <div className="px-7.5 sm:px-10 lg:px-20">
        <StoryError />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 justify-items-center gap-[50px] gap-y-[70px] py-10 sm:justify-items-start md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <LoaderCard key={index} />
        ))}
      </div>
    );
  }

  const { stories } = data!;

  return (
    <section className="grid gap-5">
      {stories.length ? (
        <div className="grid grid-cols-1 justify-items-center gap-20 gap-y-25 sm:justify-items-start md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              {...story}
              id={story._id as any}
              mutate={mutate}
            />
          ))}
        </div>
      ) : (
        <EmptyState isUser />
      )}

      <Pagination
        numberOfDocs={stories.length}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </section>
  );
}

const StoryCard = ({
  title,
  coverImage,
  description,
  status,
  genres,
  slug,
  mutate,
  createdAt,
  id,
}: StoryProps) => {
  const truncatedDescription =
    description.length > 70 ? `${description.slice(0, 70)}...` : description;
  return (
    <article className="shadow-story-card dark:shadow-story-card-dark xs:w-[300px] relative grid w-full gap-7 rounded-[10px] p-5 dark:bg-white/10">
      <Img
        aria-hidden
        className="absolute bottom-0 left-0 -z-[1] h-[57px] w-[50px] rounded-[10px] opacity-50 dark:invert"
        src={"/images/story-eclipse.png"}
        alt="Background eclipse decoration"
      />
      <Img
        className="shadow-story-card -mt-[50px] h-[200px] w-full rounded-[10px] object-cover"
        src={coverImage}
        alt={title}
      />

      <div className="grid h-fit gap-5">
        <h3 className="text-secondary xs:text-xl text-lg font-bold">{title}</h3>

        {genres.length > 0 && (
          <div className="xs:flex hidden flex-wrap items-center gap-2">
            {genres.map((genre, index) => (
              <div
                key={`${genre}-${index}`}
                className="bg-accent-blue rounded-full px-3 py-1 text-xs text-white"
              >
                {genre}
              </div>
            ))}
          </div>
        )}

        <p className="text-secondary/80">{truncatedDescription}</p>

        <div className="flex items-center justify-between">
          <Link
            href={`/stories/${slug}`}
            aria-label={`Read more about ${title}`}
            className="group text-accent-blue relative flex items-center gap-3 font-medium hover:underline"
          >
            Read More
            <span className="*:fill-accent-blue group-hover:translate-x-5">
              <ArrowRightIcon />
            </span>
          </Link>

          <StorySettings id={id} status={status} mutate={mutate} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <time className="text-secondary font-bold">
          {dayjs(createdAt).format("DD MMM, YYYY")}
        </time>

        {storyStatus(status)}
      </div>
    </article>
  );
};

function storyStatus(status: Status) {
  const statusStyles = {
    saved: "bg-accent-blue",
    published: "bg-green-500",
    default: "bg-accent-blue",
  };

  const statusStyle = statusStyles[status] || statusStyles.default;
  return (
    <p className={`${statusStyle} rounded-md p-3 py-2 text-white capitalize`}>
      {status}
    </p>
  );
}

function buildQueryParams(currentPage: number, sortedValue?: string) {
  const url = new URLSearchParams();
  if (sortedValue?.trim()) {
    url.append("status", sortedValue);
  }
  url.append("page", currentPage.toString());
  return url.toString();
}
