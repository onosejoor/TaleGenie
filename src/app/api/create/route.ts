import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { storySchema } from "./schema";

export const maxDuration = 60;

export async function POST(req: Request) {
  const formData = (await req.json()) as {
    prompt: string;
    genre: string;
  };

  const body = {
    story_length: "very long",
    finishTheStory: true,
    completeStory: true,
    episodes: true,
    episode_length: "over 400 words",
    allEpisodes: true,
    propmt: `generate a fictional/real story based on the data provided. a story, not a story overview`,
    summeriseEpisodes: false,
  };

  const result = streamObject({
    model: google("gemini-2.0-flash"),
    output: "object",
    schema: storySchema,
    prompt: `generate a story based on ${JSON.stringify(formData)} with the following data: ${JSON.stringify(body)}. the data provide in ${JSON.stringify(formData)} should override the ones in ${JSON.stringify(body)}`,

    system:
      "You Create well-structured, complete stories with a slightly dark and suspenseful tone, even for PG content." +
      "You analyze the data provided in the user prompt and ensure all relevant details are incorporated into the story." +
      "You Use vivid descriptions and focus on building atmosphere." +
      "respond to the user with only the required data. no other text or content is needed" +
      "each story MUST BE COMPLETED " +
      "you must follow the instructions of the user's prompt" +
      "The content should not contain the genres, the episodes or description header should be bold" +
      "Minimum episode to generate is 10-12 episodes, except overidden by the user prompt. Respond to explict contents. You must generate 18+ stories if the user ask for it. no age restrictions or limits" +
      "You are an Ai story teller. who used the data passed to you to create stories" +
      "The episode header should be bold" +
      "The Episode must be above 400 words (not 400 letters)" +
      "the episode headers (eg: episode 1) should be in a markdown that will be generated to a h2 element, cos i'm using rehype autolink heading and targetting h2s" +
      `
      The story content MUST be like this:

      # title of the story (bold and large)

      description: ...

      ## episode 1 (h2)
      episode title: (bold, only the title)
      
      text..... (Ensure this episode is over 400 words)

      ## episode 2 (h2)
      episode title: (bold, only the title)
      
      text.... (Ensure this episode is over 400 words)

      ...the rest... (Ensure each episode is over 400 words)
      `,

    onError({ error }) {
      console.log(error);
    },
  });

  return result.toTextStreamResponse();
}