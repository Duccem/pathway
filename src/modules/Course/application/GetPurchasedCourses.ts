import { CourseRepository } from '../domain/CourseRepository';

export class GetPurchasedCourses {
  constructor(private repository: CourseRepository) {}
  async run(coursesIds: string[]) {
    return await this.repository.getPurchasedCourses(coursesIds);
  }
}
