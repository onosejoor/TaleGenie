import Img from "@/components/Img";
import dayjs from "dayjs";
import Link from "next/link";
import Markdown from "react-markdown";

import rehypeAutolinkHeadings, { Options } from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import BackButton from "../../_components/BackButton";
import ScrollToEpisode from "../../_components/Scroller";
import { Suspense } from "react";
import OtherPosts from "./OtherPosts";

type Props = Omit<IStory, "author" | "_id"> & {
  username: string;
  name: string;
};

export default function StoryContent({
  username,
  name,
  title,
  slug,
  createdAt,
  readingTime,
  episodes,
  genres,
  coverImage,
  content,
}: Props) {
  const options: Options = {
    behavior: "wrap",
    test: (node) => node.tagName === "h2",
    properties: { class: "no-underline hover:underline" },
  };

  return (
    <>
      <article className="grid w-fit gap-10 py-10">
        <div className="flex items-center justify-between gap-5">
          <BackButton />
          <ScrollToEpisode episodes={episodes} />
        </div>

        <div className="flex w-fit flex-col gap-5">
          <div className="flex xs:items-center flex-col xs:flex-row gap-5">
            <Link
              href={`/${username}`}
              className="text-primary text-xl font-bold capitalize hover:underline dark:text-white"
            >
              By {name}
            </Link>
            <p className="text-secondary font-medium">{episodes} Episodes</p>
          </div>

          <h1 className="text-secondary sm:font-cherry text-2xl font-bold capitalize sm:text-3xl">
            {title}
          </h1>
          <div className="font-inter text-secondary/70 flex items-center gap-5 font-semibold">
            <time>{dayjs(createdAt).format("D MMM, YYYY")}</time>
            <p className="">{readingTime} read</p>
          </div>
          <div className="font-inter text-secondary/70 flex items-center gap-5 font-semibold">
            {genres?.map((genre, index) => (
              <p
                key={index}
                className="bg-accent-blue w-fit rounded-full px-3 py-1 text-sm text-white"
              >
                {genre}
              </p>
            ))}
          </div>
        </div>

        <Img
          src={coverImage}
          className="h-[300px] w-full rounded-md object-cover active:scale-90 sm:h-[500px] sm:w-[500px]"
          alt={title}
        />

        <div className="prose dark:prose-invert prose-sm md:prose-lg text-secondary">
          <Markdown
            rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, options]]}
          >
            {content}
          </Markdown>
        </div>
      </article>

      <Suspense>
        <OtherPosts currentStory={slug} />
      </Suspense>
    </>
  );
}
