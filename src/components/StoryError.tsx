import Img from "./Img";

export default function StoryError() {
  return (
    <div className="*:mb-10">
      <div className="border-light-gray bg-light-gray/10 h-[500px] w-full rounded-[10px] border-2 border-dashed p-5">
        <div className="mx-auto flex w-fit flex-col items-center gap-5">
          <Img
            src={"/images/story-error.svg"}
            alt="empty Story"
            className="h-[300px] w-[300px]"
          />
          <h3 className="text-secondary text-xl font-bold">
            An Error Occured While Getting The Stories
          </h3>
        </div>
      </div>
    </div>
  );
}
