import { CourseSectionRepository } from '../domain/CourseSectionRepository';
import { VideoStoreService } from '../domain/VideoStoreService';

export class DeleteSectionOnDeleteCourse {
  constructor(
    private readonly repository: CourseSectionRepository,
    private videoStoreService: VideoStoreService
  ) {}
  async run(courseId: string): Promise<void> {
    const sections = await this.repository.getCoursesSections(courseId);
    for (const section of sections) {
      if (section.videoUrl) {
        const existingVideoData = await this.repository.getVideoData(section.id);
        if (existingVideoData) {
          await this.videoStoreService.deleteVideo(existingVideoData.assetId);
          await this.repository.removeVideoData(existingVideoData.id);
        }
      }
      await this.repository.deleteSection(section.id);
    }
  }
}
