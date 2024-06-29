import { EventBus } from '@/modules/shared/domain/core/DomainEvent';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';
import { VideoStoreService } from '../domain/VideoStoreService';

export class DeleteSection {
  constructor(
    private readonly repository: CourseSectionRepository,
    private videoStoreService: VideoStoreService,
    private eventBus: EventBus
  ) {}
  async run(courseId: string, sectionId: string, userId: string): Promise<void> {
    const section = await this.repository.getSection(courseId, sectionId);
    if (section.videoUrl) {
      const existingVideoData = await this.repository.getVideoData(sectionId);
      if (existingVideoData) {
        await this.videoStoreService.deleteVideo(existingVideoData.assetId);
        await this.repository.removeVideoData(existingVideoData.id);
      }
    }
    section.deleteSection(userId);
    await this.repository.deleteSection(section.id);
    await this.eventBus.publish(section.pullDomainEvents());
  }
}
