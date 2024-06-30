import { CourseRepository } from '../domain/CourseRepository';

export class GetLevel {
  constructor(private repository: CourseRepository) {}
  async run(levelId: string) {
    const level = await this.repository.getLevelById(levelId);
    return level;
  }
}
