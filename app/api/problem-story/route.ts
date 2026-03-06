import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { childName, age, problem, goal } = await req.json();

    if (!childName || !age || !problem || !goal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = `You are an expert children's emotional intelligence storyteller.

Write a gentle story helping a child learn from a real-life situation.

Child name: ${childName}
Age: ${age}

Problem today:
${problem}

Lesson to teach:
${goal}

Rules:

* Use simple language suitable for children.
* The main character should experience the same problem.
* Show emotional growth and learning.
* Avoid blame or shame.
* End with a reassuring message.

Format:
First line = story title
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
    console.error('Problem story generation error:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}

