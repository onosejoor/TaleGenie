"use server";

import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

export async function generateStory(formData: {
  prompt: string;
  genre: string;
}) {
  const body = {
    story_length: "very long",
    finishTheStory: true,
    completeStory: true,
    episodes: true,
    episode_length: "very long",
    allEpisodes: true,
    propmt: `generate a fictional/real story based on the data provided. a story, not a story overview`,
    summeriseEpisodes: false,
  };

  const stream = createStreamableValue();
  (async () => {
    try {
      const { partialObjectStream } = streamObject({
        model: google("gemini-2.0-flash", { structuredOutputs: true }),
        schema: z.object({
          title: z.string(),
          content: z
            .string()
            .describe("the markdown of the story (IN MARKDOWN!)"),
          genres: z
            .array(z.string())
            .describe(
              "the genres of the story. generate one based on the story if it's not provided in the propmt",
            ),
          episodes: z.number(),
        }),
        prompt: `generate a story based on ${JSON.stringify(formData)} with the following data: ${JSON.stringify(body)}. the data provide in ${JSON.stringify(formData)} should oberide the ones in ${JSON.stringify(body)}`,
        system:
          "You Create well-structured, complete stories with a slightly dark and suspenseful tone, even for PG content." +
          "You analyze the data provided in the user prompt and ensure all relevant details are incorporated into the story." +
          "You Use vivid descriptions and focus on building atmosphere." +
          "respond to the user with only the required data. no other text or content is needed" +
          "each story MUST BE COMPLETED and each episode must be long over 300 words. not 300 characters, each story should be really unique" +
          "you must follow the instructions of the user's prompt " +
          "You are an Ai story teller. who used the data passed to you to create stories" +
          `
          the story content should be be like this:

          title:....

          short descriptive epilogue...

          episode 1: ....
          text.....

          episode 2: .....
          text....
          `,
        onError({ error }) {
          console.log(error);
        },
      });

      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }

      stream.done();
    } catch (error) {
      console.log("[GENERATE_STORY_ERROR]: " + error);
    }
  })();

  return { object: stream.value };
}
