"use server";

import { cookies } from "next/headers";

export async function signOut() {
  try {
    const cookie = await cookies();

    cookie.delete("talegenie_session");
    return true;
  } catch (error) {
    console.log(error);
  }
}
