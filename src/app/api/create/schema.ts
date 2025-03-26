import { z } from "zod";

export const storySchema = z
  .object({
    title: z.string().describe("the story title, (not in markdown"),
    genres: z
      .array(z.string())
      .describe(
        "the genres of the story. generate one based on the story if it's not provided in the propmt must not be above 2 genres, the genres must be [Comedy, Documentary, Horror, Sci Fi, Real Life, Erotica]",
      ),
    description: z
      .string()
      .describe("a short and captivating description of the story"),
    imgPrompt: z
      .string()
      .describe(
        "a nice propmt to prompt the image generation ai, based on the story. (not too long)",
      ),
    episodes: z.number(),
    story: z.string().describe("the markdown of the story (IN MARKDOWN!)"),
  })
  .strict();
