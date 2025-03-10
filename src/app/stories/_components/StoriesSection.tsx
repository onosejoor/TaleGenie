"use client";

import { useSearchParams } from "next/navigation";

import { OpenIcon } from "@/components/Icons";
import Img from "@/components/Img";
import TitleHeader from "@/components/TitleHeader";
import Link from "next/link";

type StoryProps = {
  title: string;
  content: string;
  author: string;
  date: string;
  src: string;
};

const storyDatas = [
  {
    title: "A Quiet Place",
    content:
      "Once upon a time in a bustling forest, there lived a tiny squirrel.....",
    author: "Onos",
    date: "3 Feb, 2025",
    src: "/images/naruto1.jpg",
  },
  {
    title: "A Quiet Place",
    content:
      "Once upon a time in a bustling forest, there lived a tiny squirrel.....",
    author: "Onos",
    date: "3 Feb, 2025",
    src: "/images/naruto1.jpg",
  },
  {
    title: "A Quiet Place",
    content:
      "Once upon a time in a bustling forest, there lived a tiny squirrel.....",
    author: "Onos",
    date: "3 Feb, 2025",
    src: "/images/naruto1.jpg",
  },
  {
    title: "A Quiet Place",
    content:
      "Once upon a time in a bustling forest, there lived a tiny squirrel.....",
    author: "Onos",
    date: "3 Feb, 2025",
    src: "/images/naruto1.jpg",
  },
  {
    title: "A Quiet Place",
    content:
      "Once upon a time in a bustling forest, there lived a tiny squirrel.....",
    author: "Onos",
    date: "3 Feb, 2025",
    src: "/images/naruto1.jpg",
  },
  {
    title: "A Quiet Place",
    content:
      "Once upon a time in a bustling forest, there lived a tiny squirrel.....",
    author: "Onos",
    date: "3 Feb, 2025",
    src: "/images/naruto1.jpg",
  },
];

export default function StoriesSection() {
  const searchParams = useSearchParams();
  const url = new URLSearchParams();

  const searchquery = searchParams.get("query");
  const page = searchParams.get("page");

  if (searchquery) {
    url.append("keyword", searchquery);
  }
  if (page) {
    url.append("page", page);
  }

  return (
    <section className="grid gap-20 px-10 py-20 md:px-20">
      <TitleHeader text="Explore Some Stories" />

      <div className="grid grid-cols-1 gap-[50px] gap-y-[70px] md:grid-cols-2 lg:grid-cols-3">
        {storyDatas.map((data, index) => (
          <StoryCard {...data} key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-5">
        <button className="text-secondary border-primary w-fit rounded-md border-2 bg-transparent px-5 py-3 font-semibold">
          {"<-"} Prevous
        </button>
        <b className="text-secondary">1</b>
        <button className="bg-accent-blue w-fit rounded-md px-5 py-3 font-semibold text-white">
          Next {"->"}
        </button>
      </div>
    </section>
  );
}

const StoryCard = ({ title, src, content, author, date }: StoryProps) => (
  <div className="shadow-story-card relative grid w-[300px] gap-7 rounded-[10px] p-5">
    <Img
      aria-hidden
      className="absolute bottom-0 left-0 -z-[1] h-[57px] w-[50px] rounded-[10px]"
      src={"/images/story-eclipse.png"}
      alt=""
    />
    <Img
      className="shadow-story-card -mt-[50px] h-[200px] w-full rounded-[10px] object-cover"
      src={src}
      alt={title}
    />

    <div className="grid h-fit gap-6">
      <h3 className="text-secondary text-xl font-bold">{title}</h3>
      <p className="text-secondary/80">{content}</p>

      <Link
        href={"/stories/a0q0w0e0r0"}
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
      <b className="text-primary font-bold">By {author}</b>
      <time className="text-secondary font-bold">{date}</time>
    </div>
  </div>
);
