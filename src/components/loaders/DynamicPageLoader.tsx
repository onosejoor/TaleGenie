export default function DynamicStoryLoader() {
  return (
    <div className="grid gap-7 pb-10 w-full">
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
  );
}
