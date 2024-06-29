import Mux from '@mux/mux-node';
import { VideoStoreService } from '../domain/VideoStoreService';

export class MuxVideoStoreService implements VideoStoreService {
  constructor(private client: Mux) {}
  async saveVideo(videoUrl: string): Promise<{ assetId: string; playbackId: string }> {
    const asset = await this.client.video.assets.create({
      input: [{ url: videoUrl }],
      playback_policy: ['public'],
    });
    return {
      assetId: asset.id,
      playbackId: asset.playback_ids?.[0].id || '',
    };
  }
  async deleteVideo(assetId: string): Promise<void> {
    await this.client.video.assets.delete(assetId);
  }
}
