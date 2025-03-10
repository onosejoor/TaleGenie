import { ArrowRightIcon, OpenIcon } from "@/components/Icons";
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
];

export default function RecentStories() {
  return (
    <section className="py-10 px-10 md:px-20">
      <TitleHeader text="Recent Stories" />

      <div className="grid grid-cols-1 justify-items-center gap-20 py-20 sm:grid-cols-2 md:justify-items-start lg:grid-cols-3 lg:gap-[50px]">
        {storyDatas.map((data, index) => (
          <StoryCard {...data} key={index} />
        ))}
      </div>
      <Link
        href={"/stories"}
        className="group w-fit bg-accent-blue flex items-center gap-3 overflow-hidden rounded-[10px] px-5 py-3 *:transition-all *:delay-75 *:duration-200"
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

      <button className="group relative flex items-center gap-3 *:transition-all *:delay-75 *:duration-200">
        <span className="bg-accent-blue relative h-[50px] w-[50px] rounded-full p-3 group-hover:w-full">
          <span className="absolute inset-0 left-auto grid content-center p-3 text-white group-hover:right-0">
            <OpenIcon />
          </span>
        </span>
        <span className="text-accent-blue absolute left-[60px] font-medium group-hover:text-white">
          Read More
        </span>
      </button>
    </div>
    <div className="flex items-center justify-between">
      <b className="text-primary font-bold">By {author}</b>
      <time className="text-secondary font-bold">{date}</time>
    </div>
  </div>
);
