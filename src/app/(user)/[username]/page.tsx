import { verifySession } from "@/lib/actions/dal";
import dynamic from "next/dynamic";
import { getUserProfile } from "@/lib/actions/profile";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

const UserData = dynamic(() => import("./_components/(user)/UserData"));
const ViewerData = dynamic(() => import("./_components/(viewer)/ViewerData"));

type Props = {
  params: Promise<{ username: string }>;
};

async function checkIsUser(username: string) {
  const sessionUser = (await verifySession())?.username;

  if (sessionUser && sessionUser === username) {
    return true;
  }
  return false;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const getUser = await getUserProfile(username);

  if (!getUser.success && getUser.code === 404) {
    return notFound();
  }

  const { name, avatar, bio } = getUser.user!;

  return {
    title: `${name} Profile`,
    description: bio ?? null,
    
    openGraph: {
      images: [avatar],
      title: `${name} Profile`,
      description: bio ?? null,
    },
    twitter: {
      title: `${name} Profile`,
      description: bio ?? null,
      card: "summary_large_image",
    },
  };
}

export default async function UserProfile({ params }: Props) {
  const username = (await params).username;

  if (!username || username === "null") {
    redirect("/create-username");
  }

  const getUser = await getUserProfile(username);

  if (!getUser.success && getUser.code === 404) {
    return notFound();
  }
  if (!getUser.success) {
    return <p>error fetching users</p>;
  }

  const { name, avatar, id, bio } = getUser.user!;

  const data = {
    name,
    avatar,
    username,
    userId: id,
    ...(bio && { bio }),
  };

  const isUser = await checkIsUser(username);

  function switchComponents() {
    switch (isUser) {
      case true:
        return <UserData {...data} />;

      case false:
        return <ViewerData {...data} />;
      default:
        return <ViewerData {...data} />;
    }
  }

  return <>{switchComponents()}</>;
}
