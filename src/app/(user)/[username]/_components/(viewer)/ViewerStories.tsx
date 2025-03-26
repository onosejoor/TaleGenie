"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import useSWR from "swr";

import Img from "@/components/Img";
import { OpenIcon } from "@/components/Icons";

import { fetcher, Response } from "@/app/_lib/utils";

import LoaderCard from "@/components/loaders/StoryLoader";
import StoryError from "@/components/StoryError";
import EmptyState from "../EmptyState";

const Pagination = dynamic(() => import("../Pagination"));

type StoryProps = {
  title: string;
  description: string;
  createdAt: Date;
  slug: string;
  coverImage: string;
  genres: string[];
};

export default function ViewerStories({ userId }: { userId: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useSWR<Response>(
    [`/api/user/stories?page=${currentPage}&limit=6&status=published`, userId],
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
    <section className="grid gap-10">
      {stories.length ? (
        <div className="grid grid-cols-1 justify-items-center gap-12.5 sm:justify-items-start md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard
              coverImage={story.coverImage}
              key={index}
              title={story.title}
              description={story.description}
              genres={story.genres}
              slug={story.slug}
              createdAt={story.createdAt}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
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
  description,
  genres,
  slug,
  createdAt,
  coverImage,
}: StoryProps) => {
  const truncatedString =
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
        <h3 className="text-secondary text-xl font-bold">{title}</h3>
        <div className="xs:flex hidden items-center gap-5">
          {genres?.map((genre, index) => (
            <div
              key={index}
              className="bg-accent-blue rounded-full px-3 py-1 text-xs text-white"
            >
              {genre}
            </div>
          ))}
        </div>
        <p className="text-secondary/80">{truncatedString}</p>

        <Link
          href={`/stories/${slug}`}
          className="group relative flex items-center gap-3"
        >
          <span className="bg-accent-blue relative h-[50px] w-[50px] rounded-full p-3 group-hover:w-full">
            <span className="absolute inset-0 left-auto grid content-center p-3 text-white group-hover:right-0">
              <OpenIcon />
            </span>
          </span>
          <span className="text-accent-blue absolute left-[60px] font-medium group-hover:text-white">
            Read More
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <time className="text-secondary font-bold">
          {dayjs(createdAt).format("DD MMM, YYYY")}
        </time>
      </div>
    </article>
  );
};
