import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function POST(req: NextRequest) {
  try {
    const { email, title, story } = await req.json();

    if (!email || !title || !story) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const safeTitle = String(title);
    const safeStory = String(story);

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif; background:#fef6ff; padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:20px;padding:28px 28px 32px;box-shadow:0 18px 60px rgba(150,100,180,0.18);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="font-family: 'Cormorant Garamond', serif;font-size:22px;font-weight:600;color:#2a1a3e;letter-spacing:-0.03em;">
              Emoti<span style="color:#9b6fd4;">IQ</span>
            </div>
          </div>

          <p style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#9b6fd4;font-weight:500;margin:0 0 12px;">
            Your EmotiIQ Story is Ready
          </p>

          <h1 style="font-family:'Cormorant Garamond',serif;font-size:24px;line-height:1.3;color:#2a1a3e;margin:0 0 16px;">
            ${safeTitle}
          </h1>

          <div style="font-size:14px;line-height:1.7;color:rgba(42,26,62,0.85);white-space:pre-wrap;margin-bottom:24px;">
            ${safeStory.replace(/\n/g, '<br />')}
          </div>

          <div style="margin-top:28px;margin-bottom:6px;">
            <a
              href="https://emotiq.co"
              style="
                display:inline-block;
                padding:11px 24px;
                border-radius:999px;
                background:linear-gradient(135deg,#c9b8f5,#9b6fd4);
                color:#ffffff;
                font-size:13px;
                font-weight:500;
                text-decoration:none;
                box-shadow:0 6px 22px rgba(155,111,212,0.35);
              "
            >
              Download PDF
            </a>
          </div>

          <p style="font-size:11px;color:rgba(42,26,62,0.6);margin-top:18px;">
            You can also open your EmotiIQ story on the website to generate a beautifully formatted PDF for printing or bedtime reading.
          </p>
        </div>
      </div>
    `;

    const resend = getResendClient();

    const { data: emailData, error: resendError } = await resend.emails.send({
      from: 'EmotiIQ Stories <stories@emotiq.co>',
      to: email,
      subject: 'Your EmotiIQ Story is Ready',
      html
    });

    if (resendError) {
      throw resendError;
    }

    return NextResponse.json({ ok: true, id: emailData?.id ?? null });
  } catch (error: unknown) {
    console.error('Send story email error:', error);

    if (error instanceof Error && /RESEND_API_KEY/.test(error.message)) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: 'Failed to send story email' }, { status: 500 });
  }
}

