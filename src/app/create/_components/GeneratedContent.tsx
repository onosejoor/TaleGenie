"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import rehypeAutolinkHeadings, { Options } from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import { PublishIcon, SaveIcon } from "@/components/Icons";
import Spinner from "@/components/loaders/Spinner";
import { showToast } from "@/hooks/useToast";
import { postStory } from "@/lib/actions/stories";
import { useRouter } from "next/navigation";
import ImageGen from "./ImageGen";

type Props = {
  story: string;
  episodes: number;
  title: string;
  description: string;
  genres: string[];
  readingTime: string;
  imgPrompt: string;
};
export default function GeneratedContent({
  story,
  readingTime,
  genres,
  title,
  description,
  episodes,
  imgPrompt,
}: Props) {
  const [loading, setLoading] = useState<"saved" | "published" | false>(false);
  const [coverImage, setCoverImage] = useState("");

  const router = useRouter();

  const options: Options = {
    behavior: "wrap",
    test: (node) => node.tagName === "h2",
    properties: { class: "no-underline hover:underline" },
  };

  const handleSaveStory = async () => {
    setLoading("saved");
    const data = {
      story,
      readingTime,
      genres,
      title,
      episodes,
      description,
      coverImage,
      status: "saved" as Status,
    };
    try {
      const { success, message, slug } = await postStory(data);
      showToast({
        variants: success ? "success" : "error",
        message,
      });
      router.push(`/stories/${slug}`);
      setLoading(false);

      return;
    } catch (error) {
      console.error("[SAVE_STORY_ERROR]: ", error);
    }
    setLoading(false);
  };

  const handlePublishStory = async () => {
    setLoading("published");
    const data = {
      story,
      readingTime,
      genres,
      title,
      episodes,
      description,
      coverImage,
      status: "published" as Status,
    };
    try {
      const { success, message, slug } = await postStory(data);
      showToast({
        variants: success ? "success" : "error",
        message,
      });
      router.push(`/stories/${slug}`);
      setLoading(false);

      return;
    } catch (error) {
      console.error("[SAVE_STORY_ERROR]: ", error);
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col-reverse justify-between gap-10 lg:flex-row">
      <div className="grid gap-7 pb-10">
        <div className="font-inter text-secondary/70 flex items-center gap-5 font-semibold">
          <p className="">{readingTime} read</p>
          {genres?.map((genre, index) => (
            <p
              key={index}
              className="bg-accent-blue w-fit rounded-full px-3 py-1 text-sm text-white"
            >
              {genre}
            </p>
          ))}
        </div>

        <div className="prose xs:prose-sm dark:prose-invert text-secondary/90 md:prose-lg dark:placeholder-rose-50">
          {imgPrompt && (
            <ImageGen description={imgPrompt} setCoverImage={setCoverImage} />
          )}
          <Markdown
            rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, options]]}
          >
            {story}
          </Markdown>
        </div>
      </div>

      {title && (
        <div className="top-10 flex h-fit gap-5 sm:gap-10 lg:sticky lg:mr-10">
          <button
            disabled={loading !== false}
            onClick={handleSaveStory}
            className="group bg-primary hover:bg-primary/80 flex w-fit items-center gap-3 overflow-hidden rounded-[10px] border-2 border-white p-3 px-5 *:delay-75"
          >
            {loading === "saved" ? (
              <Spinner color="white" />
            ) : (
              <>
                <span className="group-hover:translate-x-full group-hover:scale-110">
                  <SaveIcon />
                </span>
                <span className="font-medium text-white group-hover:opacity-0">
                  Save
                </span>
              </>
            )}
          </button>
          <button
            data-loading={loading}
            onClick={handlePublishStory}
            disabled={loading !== false}
            className="group text-secondary data-[loading=published]:!bg-accent-blue dark:bg-accent-blue hover:bg-accent-blue border-accent-blue flex w-fit items-center gap-3 overflow-hidden rounded-[10px] border-2 bg-transparent p-3 px-5 font-medium dark:text-white"
          >
            {loading === "published" ? (
              <Spinner color="white" />
            ) : (
              <>
                <span className="group-hover:translate-x-8 group-hover:scale-110">
                  <PublishIcon />
                </span>
                <span className="group-hover:opacity-0">Publish</span>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
