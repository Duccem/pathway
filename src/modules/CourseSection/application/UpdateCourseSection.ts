import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { CourseSection } from '../domain/CourseSection';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';
import { VideoStoreService } from '../domain/VideoStoreService';

export class UpdateCourseSection {
  constructor(private repository: CourseSectionRepository, private videoStoreService: VideoStoreService) {}

  async run(courseId: string, sectionId: string, data: Primitives<CourseSection>) {
    const section = await this.repository.getSection(courseId, sectionId);
    section.updateData(data);
    if (data.videoUrl) {
      const existingVideoData = await this.repository.getVideoData(sectionId);
      if (existingVideoData) {
        await this.videoStoreService.deleteVideo(existingVideoData.assetId);
        await this.repository.removeVideoData(existingVideoData.id);
      }
      const { assetId, playbackId } = await this.videoStoreService.saveVideo(data.videoUrl);
      section.createVideoData(assetId, playbackId);
      await this.repository.createVideoData(section.videoData);
    }
    await this.repository.saveSection(section);
  }
}
