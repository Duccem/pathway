import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { CourseRepository } from '../domain/CourseRepository';

export class UnpublishCourseOnDeleteLastSection {
  constructor(private repository: CourseRepository, private sectionSearcher: GetCourseAllSections) {}

  async run(courseId: string, userId: string) {
    const sections = await this.sectionSearcher.run(courseId);
    const publishedSectionsInCourse = sections.filter((section) => section.isPublished);
    if (!publishedSectionsInCourse.length || publishedSectionsInCourse.length === 0) {
      const course = await this.repository.getCourseById(courseId, userId);
      course.unpublish();
      await this.repository.saveCourse(course);
    }
  }
}
