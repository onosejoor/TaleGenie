import { Suspense } from "react";
import StoriesHeader from "./_components/Header";
import StoriesSection from "./_components/StoriesSection";

export const metadata = {
  title: "Stories",
  description: "Explore stories from People around the globe!",
};

export default function ExploreStories() {
  return (
    <>
      <Suspense>
        <StoriesHeader />
        <StoriesSection />
      </Suspense>
    </>
  );
}
