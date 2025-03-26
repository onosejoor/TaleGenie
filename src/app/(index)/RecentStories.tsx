"use client";

import dayjs from "dayjs";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

import { ArrowRightIcon, OpenIcon } from "@/components/Icons";
import Img from "@/components/Img";
import TitleHeader from "@/components/TitleHeader";
import StoryError from "@/components/StoryError";
import LoaderCard from "@/components/loaders/StoryLoader";

import EmptyState from "../(user)/[username]/_components/EmptyState";

interface IStory {
  title: string;
  description: string;
  createdAt: Date;
  slug: string;
  author: Omit<IUser, "password" | "_id">;
  src?: string;
  genres: string[];
  readingTime: string;
  coverImage: string
}

type StoryProps = {
  title: string;
  description: string;
  username: string;
  createdAt: Date;
  slug: string;
  src?: string;
  genres: string[];
  readingTime: string;
  name: string;
  coverImage: string
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function RecentStories() {
  const { data, isLoading, error } = useSWR<{
    success: boolean;
    stories: IStory[];
  }>(`/api/stories?&limit=3&status=published`, fetcher);

  if (error) {
    return (
      <div className="px-7.5 sm:px-10 lg:px-20">
        <StoryError />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 justify-items-center gap-[50px] gap-y-[70px] px-10 py-10 sm:justify-items-start md:grid-cols-2 md:px-20 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <LoaderCard key={index} />
        ))}
      </div>
    );
  }

  const { stories } = data!;

  return (
    <section className="grid gap-25 px-10 py-10 md:px-20">
      <TitleHeader text="Recent Stories" />
      {stories.length ? (
        <div className="grid grid-cols-1 justify-items-center gap-12.5 sm:justify-items-start md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard
              {...story}
              name={story.author.name}
              username={story.author.username}
              key={index}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
      <Link
        href={"/stories"}
        className="group bg-accent-blue flex w-fit items-center gap-3 overflow-hidden rounded-[10px] px-5 py-3 *:transition-all *:delay-75 *:duration-200"
      >
        <span className="translate-x-5 font-medium text-white group-hover:translate-x-0 group-hover:text-white">
          Explore
        </span>
        <span className="-translate-y-[40px] group-hover:translate-none">
          <ArrowRightIcon />
        </span>
      </Link>
    </section>
  );
}

const StoryCard = ({
  title,
  name,
  slug,
  genres,
  createdAt,
  username,
  description,
  coverImage
}: StoryProps) => {
  const truncatedString =
    description.length > 70 ? `${description.slice(0, 70)}...` : description;

  return (
    <article className="shadow-story-card dark:shadow-story-card-dark relative grid w-[300px] gap-7 rounded-[10px] bg-white p-5 dark:!bg-white/10">
      <Img
        aria-hidden
        className="absolute bottom-0 left-0 -z-[1] h-[57px] w-[50px] rounded-[10px] dark:invert"
        src={"/images/story-eclipse.png"}
        alt=""
      />
      <Img
        className="shadow-story-card -mt-[50px] h-[200px] w-full rounded-[10px] object-cover"
        src={coverImage}
        alt={title}
      />

      <div className="grid h-fit gap-5">
        <h3 className="text-secondary text-xl font-bold">{title}</h3>
        <div className="flex items-center gap-5">
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
          className="group relative flex items-center gap-3 *:transition-all *:delay-75 *:duration-200"
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
        <Link href={`/${username}`} className="hover:underline">
          <b className="text-primary font-bold capitalize text-xs dark:text-white">
            By {name}
          </b>
        </Link>

        <time className="text-secondary font-bold text-xs">
          {dayjs(createdAt).format("DD MMM, YYYY")}
        </time>
      </div>
    </article>
  );
};
