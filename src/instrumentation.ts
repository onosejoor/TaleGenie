import connectDB from "./lib/db";

import "./lib/models/index";

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  await connectDB();
}
