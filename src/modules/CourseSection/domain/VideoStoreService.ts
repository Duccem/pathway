export interface VideoStoreService {
  saveVideo(videoUrl: string): Promise<{ assetId: string; playbackId: string }>;
  deleteVideo(assetId: string): Promise<void>;
}
