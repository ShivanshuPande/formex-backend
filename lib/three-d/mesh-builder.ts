import type { MeshData, PromptBlueprint, Triangle, Vertex } from "@/types/three-d";

function vertex(x: number, y: number, z: number): Vertex {
  return { x, y, z };
}

function cubeTriangles(size = 1): Triangle[] {
  const s = size / 2;
  const p = {
    nnn: vertex(-s, -s, -s),
    nnp: vertex(-s, -s, s),
    npn: vertex(-s, s, -s),
    npp: vertex(-s, s, s),
    pnn: vertex(s, -s, -s),
    pnp: vertex(s, -s, s),
    ppn: vertex(s, s, -s),
    ppp: vertex(s, s, s),
  };

  const n = {
    px: vertex(1, 0, 0),
    nx: vertex(-1, 0, 0),
    py: vertex(0, 1, 0),
    ny: vertex(0, -1, 0),
    pz: vertex(0, 0, 1),
    nz: vertex(0, 0, -1),
  };

  return [
    { normal: n.px, vertices: [p.pnn, p.ppn, p.ppp] },
    { normal: n.px, vertices: [p.pnn, p.ppp, p.pnp] },
    { normal: n.nx, vertices: [p.nnn, p.npp, p.npn] },
    { normal: n.nx, vertices: [p.nnn, p.nnp, p.npp] },
    { normal: n.py, vertices: [p.npn, p.npp, p.ppp] },
    { normal: n.py, vertices: [p.npn, p.ppp, p.ppn] },
    { normal: n.ny, vertices: [p.nnn, p.pnp, p.nnp] },
    { normal: n.ny, vertices: [p.nnn, p.pnn, p.pnp] },
    { normal: n.pz, vertices: [p.nnp, p.pnp, p.ppp] },
    { normal: n.pz, vertices: [p.nnp, p.ppp, p.npp] },
    { normal: n.nz, vertices: [p.nnn, p.ppn, p.pnn] },
    { normal: n.nz, vertices: [p.nnn, p.npn, p.ppn] },
  ];
}

export function buildMeshFromBlueprint(blueprint: PromptBlueprint): MeshData {
  const triangles = cubeTriangles(1);
  return {
    name: "generated_mesh",
    triangles,
    metadata: {
      promptSummary: blueprint.summary,
      primitiveCount: blueprint.primitives.length,
      generatedAt: new Date().toISOString(),
    },
  };
}
