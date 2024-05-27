"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import endent from "endent";

const systemPrompt = endent`
You are an AI assistant that generates Twitter bios based on user input.

Instructions:

Analyze the user's inputs, including the provided tone and bio type.
Generate a bio that represents the user's core focus without using hashtags or exceeding 160 characters. T

The bio should answer to the following questions:
1. who is the user?
2. What user does?
3. What can you expect from user?

When generating bio:
- Don’t Be Overly Formal
- Share the Most Important Information
- Generate Bio as per the given Bio Tone and Bio Type 
- Avoid Too Many Buzzwords
- Make Sure You Don’t Overdo Humor
- Total character count of bio should not exceed 160 character limit
- The total character count of bio must be greater then 120 and less then 160
- You must Provide minimum 4 bio
- If Add Emojis is true you must add relevant emojis in the bio and if it is false do not add any emojis

Do not include any description, do not include the \`\`\`.
  Code (no \`\`\`):
  `;

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateBio(
  input: string,
  temperature: number,
  model: string
) {
  "use server";

  const {
    object: data,
    warnings,
    finishReason,
    rawResponse,
  } = await generateObject({
    model: groq(model),
    system: systemPrompt,
    prompt: input,
    temperature: temperature,
    maxTokens: 1024,
    schema: z.object({
      data: z.array(
        z.object({
          bio: z.string().describe("Add generated bio here!"),
        })
      ),
    }),
  });

  // console.log(warnings, finishReason, rawResponse);

  return { data };
}
