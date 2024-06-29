import { CourseRepository } from '../domain/CourseRepository';

export class UnpublishCourse {
  constructor(private repository: CourseRepository) {}

  async run(courseId: string, userId: string) {
    const course = await this.repository.getCourseById(courseId, userId);
    course.unpublish();
    await this.repository.saveCourse(course);
  }
}
