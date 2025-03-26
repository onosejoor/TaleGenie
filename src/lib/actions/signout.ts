'use server'

import { cookies } from "next/headers"

export async function signOut() {
const cookie = await cookies()

await cookie.delete("ta")
}