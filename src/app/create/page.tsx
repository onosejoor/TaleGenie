import { verifySession } from "@/lib/actions/dal";
import StreamingStory from "./_components/CreatePage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create New Story",
};

export default async function CreateStoryPage() {
  const { username } = await verifySession();

  if (!username) {
    redirect("/create-username");
  }

  return (
    <div className="relative flex flex-col px-10 py-10 lg:px-20">
      <StreamingStory />
    </div>
  );
}
