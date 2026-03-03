import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { childName, age, favouriteThing, emotion, notes, friend } = await req.json();

    if (!childName || !age || !emotion) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = `You are a warm, therapeutic children's storyteller working alongside child psychologists.

Write a personalised bedtime story for ${childName}, aged ${age}.
Their favourite thing is: ${favouriteThing || 'adventure'}.
${friend ? `Their best friend or pet is: ${friend}.` : ''}
The emotion to explore in this story: ${emotion}.
${notes ? `Extra context from their parent: ${notes}` : ''}

Rules:
- Use ${childName}'s name frequently — they are the hero
- Weave in their interests naturally, not forcedly
- Age-appropriate language for ${age}
- Warm, safe, reassuring tone — this is a bedtime story
- Explore the emotion gently — show it is okay to feel this way
- End peacefully and with emotional resolution
- 600-800 words
- Start with a title in ALL CAPS on the first line
- Use [PAUSE] for natural breathing moments`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
      max_tokens: 1200
    });

    const story = completion.choices[0]?.message?.content;

    return NextResponse.json({ story });
  } catch (error) {
    console.error('Story generation error:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}
