export type GenerationRequest = {
  prompt: string;
  userId?: string;
};

export type PromptBlueprint = {
  summary: string;
  styleKeywords: string[];
  primitives: Array<{
    type: "cube" | "cylinder" | "sphere" | "cone" | "torus";
    dimensions: Record<string, number>;
    transform: {
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      rz: number;
    };
  }>;
};

export type Vertex = {
  x: number;
  y: number;
  z: number;
};

export type Triangle = {
  normal: Vertex;
  vertices: [Vertex, Vertex, Vertex];
};

export type MeshData = {
  name: string;
  triangles: Triangle[];
  metadata: {
    promptSummary: string;
    primitiveCount: number;
    generatedAt: string;
  };
};

export type StlAsset = {
  filename: string;
  content: string;
  byteSize: number;
};

export type StoredFile = {
  fileId: string;
  bucket: string;
  publicUrl?: string;
};

export type GenerationResult = {
  requestId: string;
  prompt: string;
  blueprint: PromptBlueprint;
  mesh: MeshData;
  stl: StlAsset;
  storage: StoredFile;
};
