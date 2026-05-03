import { randomUUID } from "node:crypto";

import { storeStlInGoogleFile } from "@/lib/storage/google-file-store";
import { createBlueprintFromPrompt } from "@/lib/three-d/prompt-to-blueprint";
import { buildMeshFromBlueprint } from "@/lib/three-d/mesh-builder";
import { serializeMeshToStl } from "@/lib/three-d/stl-serializer";
import type { GenerationResult } from "@/types/three-d";

export async function generate3dModelFromPrompt(prompt: string): Promise<GenerationResult> {
  const requestId = randomUUID();

  const blueprint = await createBlueprintFromPrompt(prompt);
  const mesh = buildMeshFromBlueprint(blueprint);
  const stl = serializeMeshToStl(mesh, `${requestId}.stl`);
  const storage = await storeStlInGoogleFile(stl);

  return {
    requestId,
    prompt,
    blueprint,
    mesh,
    stl,
    storage,
  };
}
