import { generateText } from "ai";
import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyD8CerJimuz6VhANIn5VOOQFefxD7pxUO8" 
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
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
