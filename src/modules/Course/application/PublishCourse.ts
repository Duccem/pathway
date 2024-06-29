import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { FormatError } from '@/modules/shared/domain/core/errors/FormatError';
import { CourseRepository } from '../domain/CourseRepository';

export class PublishCourse {
  constructor(private courseRepository: CourseRepository, private sectionSearcher: GetCourseAllSections) {}
  async run(courseId: string, userId: string) {
    const course = await this.courseRepository.getCourseById(courseId, userId);
    const sections = await this.sectionSearcher.run(course.id);
    const isPublishedSections = sections.some((section) => section.isPublished);
    if (
      !course.title ||
      !course.description ||
      !course.categoryId ||
      !course.subCategoryId ||
      !course.levelId ||
      !course.imageUrl ||
      !course.price ||
      !isPublishedSections
    ) {
      throw new FormatError('Missing required fields');
    }
    course.publish();
    await this.courseRepository.saveCourse(course);
  }
}
