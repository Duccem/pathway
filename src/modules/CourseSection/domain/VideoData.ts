import { Primitives } from '@/modules/shared/domain/types/Primitives';

export class VideoData {
  constructor(
    public id: string,
    public assetId: string,
    public playbackId: string,
    public sectionId: string
  ) {}

  static fromPrimitives(data: Primitives<VideoData>) {
    return new VideoData(data.id, data.assetId, data.playbackId, data.sectionId);
  }

  toPrimitives() {
    return {
      id: this.id,
      assetId: this.assetId,
      playbackId: this.playbackId,
      sectionId: this.sectionId,
    };
  }
}
