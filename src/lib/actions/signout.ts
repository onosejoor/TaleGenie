"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signOut() {
  try {
    const cookie = await cookies();

    cookie.delete("talegenie_session");

    redirect("/signin");
  } catch (error) {
    console.log(error);
  }
}
