import { CourseRepository } from '../domain/CourseRepository';

export class GetAllMyCourses {
  constructor(private courseRepository: CourseRepository) {}

  async run(userId: string) {
    const courses = await this.courseRepository.listMyCoursesCreated(userId);
    return courses;
  }
}
