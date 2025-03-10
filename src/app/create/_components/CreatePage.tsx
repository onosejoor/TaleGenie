"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { readStreamableValue } from "ai/rsc";

import { generateStory } from "@/app/_lib/generateStory";
import Img from "@/components/Img";
import { ArrowDownIcon, CollapseIcon, SendIcon } from "@/components/Icons";

import GeneratedContent from "./GeneratedContent";
import { calculateReadingTime } from "@/app/_lib/utils";

type Props = {
  content: string;
  episodes: number;
  title: string;
  genres: string[];
  readingTime: string;
};

export default function StreamingStory() {
  const [data, setData] = useState<Props | null>();

  const [dropdown, setDropdown] = useState(false);
  const [collapseInput, setCollapseInput] = useState(false);

  const [formData, setFormData] = useState({
    prompt: "",
    genre: "",
  });

  const genres = ["Auto", "Comedy", "Horror", "Sci Fi", "Love"];

  const handleDropDownAndSelect = (genre: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        genre: genre,
      };
    });
    setDropdown(false);
  };

  const handleInputCollapse = () => setCollapseInput(!collapseInput);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        prompt: e.target.value,
      };
    });
  };

  const handleGenerateStoryStream = async (e: FormEvent) => {
    e.preventDefault();

    const { object } = await generateStory(formData);
    for await (const partialObject of readStreamableValue(object)) {
      if (partialObject) {
        const readingTime = calculateReadingTime(partialObject?.content || "");
        setData({ ...partialObject, readingTime: readingTime });
      }
    }
  };

  const { genre, prompt } = formData;

  return (
    <>
      {!data?.content ? (
        <NoData />
      ) : (
        <GeneratedContent
          content={data?.content}
          episodes={data.episodes}
          title={data.title}
          genres={data.genres}
          readingTime={data.readingTime}
        />
      )}

      <div className={`sticky bottom-5 z-1 mt-auto w-full`}>
        <form
          onSubmit={handleGenerateStoryStream}
          className={`shadow-story-card border-accent-blue relative mx-auto flex w-full flex-col items-start gap-10 rounded-[10px] border-2 bg-white p-5 px-5 sm:px-10 md:w-fit md:flex-row`}
        >
          <button
            type="button"
            title={collapseInput ? "open input field" : "collapse input field"}
            onClick={handleInputCollapse}
            className="border-accent-blue absolute -top-[25px] -left-4 z-10 rounded-full border-2 bg-white p-2"
          >
            <CollapseIcon />
          </button>

          {/* Genre dropdown menu */}
          {!collapseInput && (
            <div className="relative flex h-fit w-fit flex-col gap-5 md:max-w-[220px]">
              <div
                onClick={() => setDropdown(!dropdown)}
                className={`shadow-story-card flex h-[54px] w-full cursor-pointer items-center justify-between gap-5 rounded-md bg-white p-3 lg:gap-10 ${dropdown ? "border-accent-blue" : "border-transparent"} border-2`}
              >
                <b className="text-accent-blue font-medium whitespace-nowrap capitalize">
                  {genre ? genre : "Select Genre"}
                </b>
                <span className={dropdown ? "rotate-180" : "rotate-0"}>
                  <ArrowDownIcon />
                </span>
              </div>
              <div
                className={`shadow-story-card flex w-full flex-col rounded-md bg-white px-1 py-3 ${
                  !dropdown && "hidden"
                } transition`}
              >
                {genres.map((genre: string, index: number) => {
                  return (
                    <b
                      onClick={() => handleDropDownAndSelect(genre)}
                      key={index}
                      className="text-secondary cursor-pointer rounded-md p-3 font-medium capitalize"
                    >
                      {genre}
                    </b>
                  );
                })}
              </div>
            </div>
          )}

          <div className="relative flex w-full items-start gap-5 sm:gap-10">
            <textarea
              rows={5}
              cols={30}
              value={prompt}
              onChange={handleChange}
              className={`border-accent-blue w-full resize-none rounded-[10px] border-1 bg-white px-3 py-2 outline-0 transition-all focus:border-b-4 lg:w-[500px] ${collapseInput ? "h-[50px]" : "h-[140px]"}`}
              placeholder="Enter your Story Description"
            ></textarea>
            <button
              type="submit"
              className={`shadow-story-card absolute right-0 bottom-5 rounded-full bg-white p-3 sm:!static ${collapseInput ? "static" : "mr-5 sm:!m-0"}`}
            >
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

const NoData = () => (
  <div className="mx-auto flex w-fit flex-col items-center gap-5 md:flex-row">
    <Img
      src={"/images/empty-state.svg"}
      alt="Empty state, no story yet"
      className="h-[400px] w-fit"
    />
    <div className="grid h-fit gap-5">
      <h2 className="text-accent-blue text-3xl font-bold sm:text-5xl">
        No Generated Story Yet
      </h2>
      <p className="text-secondary">Generate a story using the input below</p>
    </div>
  </div>
);
