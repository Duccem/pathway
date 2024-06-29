import { CourseRepository } from '../domain/CourseRepository';

export class GetCourse {
  constructor(private courseRepository: CourseRepository) {}
  async run(courseId: string, userId: string) {
    const course = await this.courseRepository.getCourseById(courseId, userId);
    return course;
  }
}
