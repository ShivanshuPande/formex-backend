import { completeWithMistral } from "@/lib/ai/mistral-client";
import type { PromptBlueprint } from "@/types/three-d";

function fallbackBlueprint(prompt: string): PromptBlueprint {
  return {
    summary: `Fallback interpretation of prompt: ${prompt.slice(0, 120)}`,
    styleKeywords: ["minimal", "geometric", "printable"],
    primitives: [
      {
        type: "cube",
        dimensions: { width: 1, height: 1, depth: 1 },
        transform: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
      },
      {
        type: "cylinder",
        dimensions: { radius: 0.25, height: 1.2 },
        transform: { x: 0, y: 0.65, z: 0, rx: 0, ry: 0, rz: 0 },
      },
    ],
  };
}

function extractKeywords(raw: string): string[] {
  const known = ["minimal", "organic", "futuristic", "mechanical", "low-poly", "printable"];
  const lower = raw.toLowerCase();
  return known.filter((word) => lower.includes(word));
}

export async function createBlueprintFromPrompt(prompt: string): Promise<PromptBlueprint> {
  const systemPrompt = [
    "You are a 3D CAD planning assistant.",
    "Convert user prompt into a compact plan with primitive shapes.",
    "Return plain text with sections: SUMMARY, STYLE, PRIMITIVES.",
  ].join(" ");

  try {
    const rawPlan = await completeWithMistral([
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ]);

    return {
      summary: rawPlan.slice(0, 300),
      styleKeywords: extractKeywords(rawPlan),
      primitives: [
        {
          type: "cube",
          dimensions: { width: 1.2, height: 0.8, depth: 1 },
          transform: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
        },
        {
          type: "cylinder",
          dimensions: { radius: 0.2, height: 1.1 },
          transform: { x: 0.35, y: 0.4, z: 0, rx: 0, ry: 0, rz: 0 },
        },
      ],
    };
  } catch (error) {
    console.warn("Falling back to local blueprint builder", error);
    return fallbackBlueprint(prompt);
  }
}
