import type { MeshData, StlAsset } from "@/types/three-d";

function formatVertex(v: { x: number; y: number; z: number }): string {
  return `${v.x.toFixed(6)} ${v.y.toFixed(6)} ${v.z.toFixed(6)}`;
}

export function serializeMeshToStl(mesh: MeshData, filename = "generated-model.stl"): StlAsset {
  const lines: string[] = [`solid ${mesh.name}`];

  for (const triangle of mesh.triangles) {
    lines.push(`  facet normal ${formatVertex(triangle.normal)}`);
    lines.push("    outer loop");
    for (const point of triangle.vertices) {
      lines.push(`      vertex ${formatVertex(point)}`);
    }
    lines.push("    endloop");
    lines.push("  endfacet");
  }

  lines.push(`endsolid ${mesh.name}`);
  const content = lines.join("\n");

  return {
    filename,
    content,
    byteSize: Buffer.byteLength(content, "utf8"),
  };
}
