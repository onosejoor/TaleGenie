export const calculateReadingTime = (content: string) => {
  const wordsPerMinuite = 150;
  const totalWords = content.split(" ").length;

  const readingTime = Math.ceil(totalWords / wordsPerMinuite);
  return readingTime === 1 ? `${readingTime} min` : `${readingTime} mins`;
};
