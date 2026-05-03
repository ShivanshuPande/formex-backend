This is a Next.js backend-oriented project for prompt-to-3D model generation.

## API Endpoint

`POST /generate/3dmodel/stl`

Request body:

```json
{
  "prompt": "a futuristic desk lamp with curved body"
}
```

The current route simulates a 3-minute processing time and then returns a success response.

## Internal Generation Pipeline

The project includes a realistic, modular backend pipeline:

- `lib/ai/mistral-client.ts` - wraps Mistral chat completion calls with fallback behavior.
- `lib/three-d/prompt-to-blueprint.ts` - converts text prompts to primitive-based blueprint plans.
- `lib/three-d/mesh-builder.ts` - transforms blueprints into mesh triangle data.
- `lib/three-d/stl-serializer.ts` - serializes mesh data into ASCII STL content.
- `lib/storage/google-file-store.ts` - abstracts Google file storage upload behavior.
- `lib/pipeline/generate-3d-model.ts` - orchestrates end-to-end generation.

This keeps the API route stable while allowing the real model-generation logic to grow.

## Environment Setup

Copy `.env.example` to `.env.local` and configure values:

```bash
cp .env.example .env.local
```

Important keys:

- `MISTRAL_API_KEY`
- `MISTRAL_MODEL`
- `GOOGLE_FILE_BUCKET`
- `GOOGLE_APPLICATION_CREDENTIALS`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000). Use Postman to call the API endpoint above.

