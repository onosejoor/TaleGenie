import Img from "@/components/Img";
import Link from "next/link";

const EmptyState = ({ isUser }: { isUser?: boolean }) => (
  <div className="*:mb-10">
    <div className="border-light-gray bg-light-gray/10 h-[500px] w-full rounded-[10px] border-2 border-dashed p-5">
      <div className="mx-auto flex w-fit flex-col items-center gap-5">
        <Img
          src={"/images/profile-empty-state.svg"}
          alt="empty Story"
          className="h-[300px] w-[300px]"
        />
        <h3 className="text-secondary text-xl font-bold">No Story Yet</h3>

        {isUser && (
          <Link href={"/create"} className="bg-accent-blue rounded-[10px] px-5 p-3 text-white">
            Create Story
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default EmptyState;
