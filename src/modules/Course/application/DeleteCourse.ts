import { EventBus } from '@/modules/shared/domain/core/DomainEvent';
import { CourseRepository } from '../domain/CourseRepository';

export class DeleteCourse {
  constructor(private readonly repository: CourseRepository, private eventBus: EventBus) {}

  async run(courseId: string, userId: string): Promise<void> {
    const course = await this.repository.getCourseById(courseId, userId);
    course.deleteCourse();
    await this.repository.deleteCourse(course.id);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}
