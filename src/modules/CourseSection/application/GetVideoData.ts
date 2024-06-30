import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class GetVideoData {
  constructor(private repository: CourseSectionRepository) {}
  async run(sectionId: string) {
    const videoData = await this.repository.getVideoData(sectionId);
    return videoData;
  }
}
