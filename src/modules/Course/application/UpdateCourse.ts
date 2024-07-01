import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class UpdateCourse {
  constructor(private readonly repository: CourseRepository) {}

  async run(courseId: string, userId: string, data: Primitives<Course>): Promise<void> {
    const course = await this.repository.getCourseById(courseId, userId);
    const courseUpdated = course.updateCourse(data);
    await this.repository.saveCourse(courseUpdated);
  }
}
