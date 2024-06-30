import { put } from '@vercel/blob';

export class VercelBlobFileUploader {
  constructor() {}

  async upload(file: Blob, path: string): Promise<string> {
    const response = await put(path, file);
    return response.url;
  }
}
