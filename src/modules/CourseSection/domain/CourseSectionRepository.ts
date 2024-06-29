import { CourseSection } from './CourseSection';
import { CourseSectionResource } from './CourseSectionResource';
import { VideoData } from './VideoData';

export interface CourseSectionRepository {
  getLastSectionPosition(courseId: string): Promise<number>;
  getVideoData(sectionId: string): Promise<VideoData>;
  getSection(courseId: string, sectionId: string): Promise<CourseSection>;
  getCoursesSections(courseId: string): Promise<CourseSection[]>;
  saveSection(section: CourseSection): Promise<void>;
  addResource(resource: CourseSectionResource): Promise<void>;
  createVideoData(videoData: VideoData): Promise<void>;
  removeResource(resourceId: string, sectionId: string): Promise<void>;
  removeVideoData(videoDataId: string): Promise<void>;
  deleteSection(sectionId: string): Promise<void>;
}
