const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type MistralResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function getApiKey(): string | undefined {
  return process.env.MISTRAL_API_KEY;
}

export async function completeWithMistral(messages: ChatMessage[]): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return [
      "Mistral key not configured.",
      "Fallback blueprint: single centered cube with neutral proportions.",
      "Style keywords: minimal, geometric, printable",
    ].join("\n");
  }

  const response = await fetch(MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.MISTRAL_MODEL ?? "mistral-large-latest",
      messages,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mistral request failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as MistralResponse;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Mistral response did not contain message content");
  }

  return content;
}
