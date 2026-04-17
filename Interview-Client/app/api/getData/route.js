import { generateText } from "ai";
import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const { text } = await generateText({
      model: google("gemini-3.1-flash-lite-preview"), 
      messages,
      temperature: 0.7,
    });

    return NextResponse.json({
      content: text,
      success: true
    });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { message: error.message, error: error.message, success: false },
      { status: 500 }
    );
  }
}