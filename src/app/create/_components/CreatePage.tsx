"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import TextArea from "rc-textarea";

import Img from "@/components/Img";
import {
  ArrowDownIcon,
  CollapseIcon,
  SendIcon,
  StopIcon,
} from "@/components/Icons";
import { calculateReadingTime } from "@/app/_lib/utils";
import { storySchema } from "@/app/api/create/schema";
import dynamic from "next/dynamic";

const GeneratedContent = dynamic(() => import("./GeneratedContent"));

type Props = {
  story: string;
  episodes: number;
  title: string;
  genres: string[];
  readingTime: string;
  description: string;
  imgPrompt: string;
};

export default function StreamingStory() {
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/create",
    schema: storySchema,
  });

  const [data, setData] = useState<Props | null>();
  const [dropdown, setDropdown] = useState(false);
  const [collapseInput, setCollapseInput] = useState(false);

  const [formData, setFormData] = useState({
    prompt: "",
    genre: "",
  });

  useEffect(() => {
    if (object) {
      const readingTime = calculateReadingTime(object.story || "");
      setData({
        ...object,
        readingTime,
      } as Props);
    }
  }, [object]);

  const genres = ["Comedy", "Documentary", "Horror", "Sci Fi", "Real Life"];

  const isDisabled = isLoading || !formData.prompt.trim();

  const handleDropDownAndSelect = (genre: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        genre: genre,
      };
    });
    setDropdown(false);
  };

  const handleInputCollapse = () => {
    setCollapseInput(!collapseInput);
    setDropdown(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        prompt: e.target.value,
      };
    });
  };

  const handleGenerateStoryStream = (e: FormEvent) => {
    e.preventDefault();
    setData(null);

    submit(formData);
    setFormData({
      prompt: "",
      genre: "",
    });
    setCollapseInput(false);
  };

  const { genre, prompt } = formData;

  return (
    <>
      {!data?.story ? (
        <NoData isLoading={isLoading} />
      ) : (
        <GeneratedContent {...data} />
      )}

      <div className={`sticky bottom-5 z-1 mt-auto w-full`}>
        <form
          onSubmit={handleGenerateStoryStream}
          className={`shadow-story-card border-accent-blue relative mx-auto flex w-full flex-col items-start gap-10 rounded-[10px] border-2 bg-white p-5 px-5 backdrop-blur-lg sm:px-10 md:w-fit md:flex-row dark:bg-black/60`}
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
            <div
              role="button"
              className="relative flex h-fit w-fit flex-col gap-5 md:max-w-[220px]"
            >
              <div
                onClick={() => setDropdown(!dropdown)}
                className={`shadow-story-card flex h-[54px] w-full cursor-pointer items-center justify-between gap-5 rounded-md bg-white p-3 lg:gap-10 dark:bg-black/60 ${dropdown ? "border-accent-blue" : "border-transparent"} border-2`}
              >
                <b className="text-accent-blue font-medium whitespace-nowrap capitalize dark:text-white/80">
                  {genre ? genre : "Select Genre"}
                </b>
                <span className={dropdown ? "rotate-180" : "rotate-0"}>
                  <ArrowDownIcon />
                </span>
              </div>
              {dropdown && (
                <div
                  className={`shadow-story-card flex w-full flex-col rounded-md bg-white px-1 py-3 transition dark:bg-black/70`}
                >
                  {genres.map((genre: string, index: number) => {
                    return (
                      <b
                        onClick={() => handleDropDownAndSelect(genre)}
                        key={index}
                        className="text-secondary cursor-pointer rounded-md p-3 font-medium capitalize dark:text-white"
                      >
                        {genre}
                      </b>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="relative flex w-full items-start gap-5 sm:gap-10">
            <TextArea
              cols={30}
              autoSize
              value={prompt}
              onChange={handleChange}
              className={`border-accent-blue ${collapseInput ? "!h-[50px]" : ""} dark:border-secondary no-scrollbar max-h-[200px] min-h-[50px] w-full resize-none overflow-y-scroll rounded-[10px] border-1 bg-white px-3 py-2 outline-0 transition-all focus:border-b-4 lg:w-[500px] dark:bg-black/70 dark:text-white dark:placeholder:text-white`}
              placeholder="Enter your Story Description"
            />

            {!isLoading ? (
              <button
                disabled={isDisabled}
                type="submit"
                className={`shadow-story-card dark:bg-dark-gray/50 right-0 bottom-5 overflow-hidden rounded-full bg-white p-3 active:scale-80 disabled:!cursor-not-allowed`}
              >
                <span
                  data-loading={isLoading}
                  className="data-[loading=true]:animate-send block"
                >
                  <SendIcon />
                </span>
              </button>
            ) : (
              <div
                role="button"
                onClick={stop}
                title="stop"
                aria-label="stop genrating story"
                className={`shadow-story-card dark:bg-dark-gray right-0 bottom-5 animate-spin cursor-pointer overflow-hidden rounded-full border-2 border-white border-t-red-500 bg-white p-2.5 active:scale-80 disabled:!cursor-not-allowed`}
              >
                <StopIcon />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

const NoData = ({ isLoading }: { isLoading: boolean }) =>
  isLoading ? (
    <div className="grid gap-7 pb-10">
      <div className="grid gap-10">
        <div className="flex items-center gap-5">
          <p className="bg-light-gray h-5 w-[100px] shrink-0 animate-pulse rounded-full"></p>

          <p className="bg-light-gray h-5 w-[100px] shrink-0 animate-pulse rounded-full"></p>
        </div>
        <p className="bg-light-gray h-5 w-full animate-pulse rounded-full sm:max-w-[500px]"></p>

        <p className="bg-light-gray h-5 w-full animate-pulse rounded-full sm:max-w-[500px]"></p>
      </div>

      <div className="bg-light-gray h-[300px] w-full animate-pulse rounded-[10px] sm:max-w-[500px]"></div>
      <div className="grid gap-5">
        {[...Array(7)].map((_, index) => (
          <div
            style={{ width: index * 100 }}
            key={index}
            className="bg-light-gray h-5 !w-full animate-pulse rounded-full sm:max-w-[500px]"
          ></div>
        ))}
      </div>
    </div>
  ) : (
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
