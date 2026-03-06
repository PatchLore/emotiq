import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { emotion } = await req.json();

    if (!emotion) {
      return NextResponse.json({ error: 'Emotion is required' }, { status: 400 });
    }

    const prompt = `You are a warm emotional intelligence coach speaking to a young child.

A child says they feel: ${emotion}

Respond in 2–3 short sentences with reassurance and a gentle suggestion.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 200
    });

    const responseText = completion.choices[0]?.message?.content ?? '';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Emotion response error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}

