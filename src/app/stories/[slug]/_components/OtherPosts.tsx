import Story from "@/lib/models/story.model";
import dayjs from "dayjs";
import Link from "next/link";

export default async function OtherPosts({
  currentStory,
}: {
  currentStory: string;
}) {
  const getFewStories = await Story.find({
    status: "published",
    slug: { $ne: currentStory },
  })
    .sort({ updatedAt: -1 })
    .limit(2)
    .lean();

  if (!getFewStories.length) {
    return;
  }

  return (
    <div className="border-secondary/50 sticky top-0 max-w-[400px] lg:shrink-0 border-l p-5 py-10 md:h-screen md:pr-10">
      <h4 className="text-primary dark:text-light-gray font-cherry mb-10 text-3xl font-bold">
        Check Out Other Posts
      </h4>

      <div className="grid h-fit gap-10">
        {getFewStories.map((story) => {
          const { title, createdAt, slug, readingTime, _id, description } =
            story;

          return (
            <Link href={`/stories/${slug}`} key={btoa(`${_id}`)} className="group">
              <article className="grid h-fit gap-5">
                <div className="shadow-story-card dark:shadow-story-card-dark grid gap-3 rounded-2xl p-5 dark:bg-black">
                  <h1 className="text-secondary group-hover:underline font-cherry text-lg font-bold capitalize">
                    {title}
                  </h1>
                  <div className="font-inter text-secondary/70 flex flex-col items-start gap-5 font-semibold sm:flex-row sm:items-center">
                    <time>{dayjs(createdAt).format("D MMM, YYYY")}</time>
                    <p className="text-accent-blue">{readingTime} read</p>
                  </div>
                  <p className="text-secondary/70">
                    {description.slice(0, 51)}.....
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
