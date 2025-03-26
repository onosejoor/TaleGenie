import axios from "axios";

export type Response = {
  success: boolean;
  stories: IStory[];
};

export const calculateReadingTime = (content: string) => {
  const wordsPerMinuite = 150;
  const totalWords = content.split(" ").length;

  const readingTime = Math.ceil(totalWords / wordsPerMinuite);
  return readingTime === 1 ? `${readingTime} min` : `${readingTime} mins`;
};

export const fetcher = async ([url, userId]: string) => {
  const res = await axios.get(url, {
    headers: {
      userId,
    },
  });
  return res.data;
};

export const isActiveClassName = (isActive: boolean) =>
  isActive
    ? "font-bold text-primary dark:text-white before:!bg-primary dark:before:!bg-white before:w-full"
    : "text-secondary/70  border-transparent before:w-0 font-semibold";

export function validateUsername(username: string) {
  const trimer = username.trim()
  const regex = /^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,16}(?<![_-])$/;
  return regex.test(trimer);
}
