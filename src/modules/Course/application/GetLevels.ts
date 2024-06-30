import { CourseRepository } from '../domain/CourseRepository';

export class GetLevels {
  constructor(private repository: CourseRepository) {}
  async run() {
    return await this.repository.getCourseLevels();
  }
}
