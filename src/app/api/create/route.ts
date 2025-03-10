import { google } from "@ai-sdk/google";
import { Output, streamText } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const body = {
    name: "a quiet place",
    length: "very long",
    genre: "horror (dark)",
    finishTheStory: true,
    completeStory: true,
    episodes: true,
    episode_length: "very long",
    allEpisodes: true,
    propmt: `generate a fictional story based on the data provided. a story, not a story overview and override the data above, if it's provided in: ${prompt}`,
    summeriseEpisodes: false,
  };

  const result = streamText({
    headers: {
      "Content-Type": "application/json",
    },
    experimental_output: Output.object({
      schema: z.object({
        title: z.string(),
        content: z.string().describe("the markdown of the story (IN MARKDOWN!)"),
        genre: z.array(z.string()),
        episodes: z.number(),
      }),
    }),
    model: google("gemini-1.5-flash", { structuredOutputs: true }),
    prompt: `generate a story with the following data: ${JSON.stringify(body)}`,
    system:
      "You are an Ai story teller. who used the data passed to you to create stories" +
      "respond to the user with only the required data. no other text or content is needed" +
      "you must follow the instructions of the user's prompt." +
      "each story MUST BE COMPLETED" +
      "reply to PG messages/prompts",
  });

  return result.toDataStreamResponse();
}
