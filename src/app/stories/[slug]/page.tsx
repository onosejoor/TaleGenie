import { notFound } from "next/navigation";

import { getSingleStory } from "@/lib/actions/storyslug";
import StoryContent from "./_components/StoryContent";
import { Metadata } from "next";
import dayjs from "dayjs";
import StoryError from "@/components/StoryError";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const getStory = await getSingleStory(slug);

  if (!getStory.success && getStory.code === 404) {
    return notFound();
  }

  const { title, description, author, updatedAt, coverImage } = getStory.story!;
  return {
    title,
    description,
    authors: {
      name: `${author.name} (${author.username})`,
      url: `/${author.username}`,
    },
    openGraph: {
      images: [coverImage],
      title,
      description,
      type: "article",
      publishedTime: dayjs(updatedAt).format("D MMM, YYYY"),
      authors: `/${author.username}`,
    },

    twitter: {
      title,
      description,
    },
  };
}

export default async function DynamicStoryPage({ params }: Props) {
  const slug = (await params).slug;

  const getStory = await getSingleStory(slug);

  if (!getStory.success && getStory.code === 404) {
    return notFound();
  }

  if (getStory.message) {
    return <StoryError />;
  }

  const { story } = getStory;

  return (
    <StoryContent
      {...story!}
      username={story!.author.username}
      name={story!.author.name}
    />
  );
}
