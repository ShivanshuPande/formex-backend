import { randomUUID } from "node:crypto";

import type { StoredFile, StlAsset } from "@/types/three-d";

type StorageConfig = {
  bucketName: string;
  enabled: boolean;
};

function getStorageConfig(): StorageConfig {
  return {
    bucketName: process.env.GOOGLE_FILE_BUCKET ?? "mock-generated-models",
    enabled: Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  };
}

async function mockUpload(asset: StlAsset, bucketName: string): Promise<StoredFile> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    fileId: `mock-${randomUUID()}`,
    bucket: bucketName,
    publicUrl: `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(asset.filename)}`,
  };
}

export async function storeStlInGoogleFile(asset: StlAsset): Promise<StoredFile> {
  const config = getStorageConfig();

  if (!config.enabled) {
    return mockUpload(asset, config.bucketName);
  }

  /**
   * Real GCS upload can be wired here with @google-cloud/storage.
   * Keeping the signature stable so route/business code does not change later.
   */
  return mockUpload(asset, config.bucketName);
}
