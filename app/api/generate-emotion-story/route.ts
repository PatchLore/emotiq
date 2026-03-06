import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { emotion, situation, goal, childName, age } = await req.json();

    if (!emotion || !situation || !goal || !childName || !age) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = `You are an expert children's storyteller and emotional intelligence coach.

Write a gentle bedtime story for a child named ${childName} aged ${age}.

The story should help the child process the following emotion:

Emotion: ${emotion}
Situation: ${situation}
Learning Goal: ${goal}

Rules:
- Write in simple language suitable for children.
- Make the main character experience the same emotion.
- Show how they overcome the situation.
- Include moments of reassurance.
- End with a positive lesson.

Format:
First line = title
Then the story body.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
      max_tokens: 1200
    });

    const fullContent = completion.choices[0]?.message?.content ?? '';
    const lines = fullContent.split('\n');
    const nonEmptyLines = lines.filter((line) => line.trim() !== '');
    const title = nonEmptyLines[0] ?? '';
    const story = nonEmptyLines.slice(1).join('\n').trim();

    return NextResponse.json({ title, story });
  } catch (error) {
    console.error('Emotion story generation error:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}

