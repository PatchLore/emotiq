import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const THEMES = [
  'kindness',
  'patience',
  'courage',
  'sharing',
  'honesty',
  'trying again',
  'helping others',
  'staying calm',
  'confidence'
] as const;

export async function GET() {
  try {
    const today = new Date();
    const index = today.getDate() % THEMES.length;
    const theme = THEMES[index];

    const prompt = `You are a children's storyteller.

Write a short bedtime story teaching the theme: ${theme}.

Rules:

* Use simple language for children aged 4–8.
* Include a friendly animal character.
* Make the story calming and positive.
* End with a gentle lesson.

Format:
First line = title
Then the story.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
      max_tokens: 800
    });

    const fullContent = completion.choices[0]?.message?.content ?? '';
    const lines = fullContent.split('\n');
    const nonEmpty = lines.filter((line) => line.trim() !== '');
    const title = nonEmpty[0] ?? '';
    const story = nonEmpty.slice(1).join('\n').trim();

    return NextResponse.json({ theme, title, story });
  } catch (error) {
    console.error('Daily story generation error:', error);
    return NextResponse.json({ error: 'Failed to generate daily story' }, { status: 500 });
  }
}

