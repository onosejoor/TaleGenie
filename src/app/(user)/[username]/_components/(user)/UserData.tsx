import Img from "@/components/Img";
import TitleHeader from "@/components/TitleHeader";
import UserStories from "./UserStories";
import Story from "@/lib/models/story.model";
import StorySorter from "./Sorter";

type Props = {
  name: string;
  avatar: string;
  username: string;
  userId: string;
  bio?: string;
};

export default async function UserData({
  name,
  avatar,
  username,
  userId,
  bio,
}: Props) {
  const totalPosts = await Story.countDocuments({
    author: userId,
  });

  return (
    <div className="talegenie-container xs:px-10 relative grid gap-22.5 px-7.5 py-10 md:px-20">
      <Img
        alt={""}
        src={"/images/portfolio-eclipse-1.png"}
        aria-hidden
        className="absolute top-0 -left-2 -z-1 h-[200px] w-fit rounded-[10px] select-none"
      />
      <div className="flex h-fit flex-col gap-12.5 md:flex-row">
        <Img
          alt={name}
          src={avatar}
          className="xs:w-[300px] h-[300px] w-full rounded-[10px] object-cover"
        />
        <div className="grid gap-6">
          <div className="*:mb-3">
            <h1 className="text-primary font-cherry text-3xl font-bold capitalize">
              {name}
            </h1>

            <p className="text-secondary/70 text-lg font-medium">{username}</p>
          </div>
          {bio && <p className="text-secondary/80">{bio}</p>}
          <div className="bg-light-gray/50 dark:bg-black/70 grid h-fit w-fit gap-3 self-end rounded-[10px] p-5">
            <b className="text-secondary text-xl">{totalPosts}</b>

            <p className="text-secondary/80 text-xs font-bold">Total Stories</p>
          </div>
        </div>
      </div>
      <section className="grid gap-20">
        <div className="border-light-gray flex items-center justify-between border-b-2 py-5">
          <TitleHeader text="Stories" />
          <StorySorter />
        </div>

        <UserStories userId={userId} />
      </section>
    </div>
  );
}
