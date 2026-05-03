import { NextResponse } from "next/server";

export const maxDuration = 300;

const PROCESSING_DELAY_MS = 3 * 60 * 1000;

type GenerateBody = {
  prompt?: unknown;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { prompt } = body;
  if (typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json(
      { error: 'Body must include a non-empty string field "prompt"' },
      { status: 400 },
    );
  }

  const receivedAt = Date.now();
  const receivedAtIso = new Date(receivedAt).toISOString();

  console.log(
    `[generate/3dmodel/stl] Request received at ${receivedAtIso}, prompt length: ${prompt.length}`,
  );

  await delay(PROCESSING_DELAY_MS);

  const completedAt = Date.now();
  const durationMs = completedAt - receivedAt;

  return NextResponse.json({
    status: "success",
    message: "Generated model successfully stored in the Drive.",
    request: {
      received: true,
      prompt,
    },
    timing: {
      receivedAt: receivedAtIso,
      processingDurationMs: durationMs,
      targetDelayMs: PROCESSING_DELAY_MS,
    },
  });
}

export function GET() {
  return NextResponse.json(
    {
      endpoint: "/generate/3dmodel/stl",
      method: "POST",
      body: { prompt: "string — your generation prompt" },
      note: "Response is returned after ~3 minutes of simulated processing.",
    },
    { status: 200 },
  );
}
