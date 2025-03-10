import { OpenIcon } from "@/components/Icons";
import Markdown from "react-markdown";

type Props = {
  content: string;
  episodes: number;
  title: string;
  genres: string[];
  readingTime: string;
};
export default function GeneratedContent({
  content,
  readingTime,
  title,
}: Props) {
  return (
    <section className="flex flex-col-reverse justify-between gap-10 lg:flex-row">
      <div className="prose text-secondary/90 md:prose-lg grid gap-3 pb-10">
        {/* <div className="font-inter text-secondary/70 flex items-center gap-5 font-semibold">
          {/* <time>{dayjs(findBlog.dateCreated).format("D MMM, YYYY")}</time> */}
        {/* <p className="">{readingTime} read</p> */}
        {/* </div> *\} */}

        <Markdown>{content}</Markdown>
      </div>
      <div className="top-10 flex h-fit gap-5 sm:gap-10 lg:sticky lg:mr-10">
        <button className="group bg-primary flex w-fit items-center gap-3 overflow-hidden rounded-[10px] border-2 border-white p-3 *:transition-all *:delay-75 *:duration-200">
          <span className="translate-x-5 font-medium text-white group-hover:translate-x-0">
            Save
          </span>
          <span className="-translate-y-[40px] group-hover:translate-none">
            <OpenIcon />
          </span>
        </button>
        <button className="text-secondary border-accent-blue flex w-fit items-center gap-3 overflow-hidden rounded-[10px] border-2 bg-transparent p-3 px-5 font-medium *:transition-all *:delay-75 *:duration-200">
          Publish
        </button>
      </div>
    </section>
  );
}
