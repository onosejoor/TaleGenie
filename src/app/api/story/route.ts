// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

// export async function GET(req: NextRequest) {
//   //   const { prompt } = await req.json();
//   const body = {
//     name: "a quiet place",
//     length: "very long",
//     genre: "horror (dark)",
//     finishTheStory: true,
//     completeStory: true,
//     episodes: true,
//     episode_length: "very long",
//     allEpisodes: true,
//     propmt:
//       "generate a fictional story based on the data provided. a story, not a story overview",
//     summeriseEpisodes: false,
//   };

//   const prompt = `generate a story with the following data: ${JSON.stringify(
//     body
//   )}`;

//   const stream = new TransformStream();
//   const writer = stream.writable.getWriter();

//   try {
//     const result = await model.generateContentStream(prompt);
//     for await (const chunk of result.stream) {
//       const text = chunk.text();
//       console.log(text);
//     }
//   } catch (error) {
//     console.error("Error streaming:", error);
//     await writer.write(`data: Error occurred.\n\n`);
//   } finally {
//     await writer.close();
//   }

//   return new NextResponse(stream.readable, {
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//     },
//   });
// }
// export async function POST(req: NextRequest) {
// //   const { text } = await req.json();
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

//   const body = {
//     name: "a quiet place",
//     length: "very long",
//     genre: "horror (dark)",
//     finishTheStory: true,
//     completeStory: true,
//     episodes: true,
//     episode_length: "very long",
//     allEpisodes: true,
//     propmt:
//       "generate a fictional story based on the data provided. a story, not a story overview",
//     summeriseEpisodes: false,
//   };

//   const prompt = `generate a story with the following data: ${JSON.stringify(
//     body
//   )}`;

//   try {
//     const result = await model.generateContentStream(prompt);
//     for await (const chunk of result.stream) {
//       const text = chunk.text();
//       console.log(text);
//     }

//     const reader = result.stream;
//     const decoder = new TextDecoder("utf-8");
//     let done = false;
//     const chunks = [];

//     while (!done) {
//       const { value, done: doneReading } = await reader.();
//       done = doneReading;
//       chunks.push(decoder.decode(value));
//     }

//     return NextResponse.json({ streamedText: chunks.join("") });
//   } catch (error) {
//     return NextResponse.error();
//   }
// }
