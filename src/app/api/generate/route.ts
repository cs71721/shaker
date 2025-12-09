import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 100,
        temperature: 1.0,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    let text = "";
    if (data.content && data.content.length > 0) {
      text = data.content.filter((c: { type: string }) => c.type === "text").map((c: { text: string }) => c.text).join("");
    }

    return NextResponse.json({ text: text.trim().replace(/^["']|["']$/g, '') });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}
