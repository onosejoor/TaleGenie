import { verifySession } from "@/lib/actions/dal";
import { notFound } from "next/navigation";
import CreateUsernameModal from "./Form";

export default async function CreateUsernamePage() {
  const session = await verifySession();

  if (session?.username) {
    return notFound()
  }

  return <CreateUsernameModal />;
}
