const LoaderCard = () => {
  return (
    <div className="shadow-story-card relative grid w-[300px] gap-7 rounded-[10px] p-5 dark:bg-white/10">
      <div className="shadow-story-card bg-light-gray -mt-[50px] h-[200px] w-full animate-pulse rounded-[10px]"></div>

      <div className="grid h-fit gap-5">
        <h3 className="bg-light-gray h-5 animate-pulse rounded-full text-xl font-bold"></h3>

        <div className="bg-light-gray h-5 animate-pulse rounded-full px-3 py-1 text-xs text-white"></div>

        <p className="bg-light-gray h-5 animate-pulse rounded-full"></p>
      </div>
      <div className="flex items-center justify-between">
        <div className="bg-light-gray w-[100px] animate-pulse hover:underline"></div>

        <time className="text-secondary bg-light-gray w-[100px] animate-pulse font-bold"></time>
      </div>
    </div>
  );
};

export default LoaderCard;
