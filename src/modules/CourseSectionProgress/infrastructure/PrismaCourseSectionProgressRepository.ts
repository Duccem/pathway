import { PrismaClient } from '@prisma/client';
import { CourseSectionProgress } from '../domain/CourseSectionProgress';
import { CourseSectionProgressRepository } from '../domain/CourseSectionProgressRepository';

export class PrismaCourseSectionProgressRepository implements CourseSectionProgressRepository {
  constructor(private client: PrismaClient) {}
  get model() {
    return this.client.courseSectionProgress;
  }
  async saveProgress(progress: CourseSectionProgress): Promise<void> {
    await this.model.upsert({
      where: {
        studentId_sectionId: {
          studentId: progress.studentId,
          sectionId: progress.sectionId,
        },
      },
      update: { isCompleted: progress.isCompleted },
      create: {
        studentId: progress.studentId,
        sectionId: progress.sectionId,
        isCompleted: progress.isCompleted,
      },
    });
  }
  async getUserSectionProgress(studentId: string, sectionId: string): Promise<CourseSectionProgress> {
    const progress = await this.model.findUnique({
      where: {
        studentId_sectionId: {
          studentId,
          sectionId,
        },
      },
    });
    return progress ? CourseSectionProgress.fromPrimitives(progress) : null;
  }
  async countCompletedSectionsProgress(
    studentId: string,
    sectionIds: string[]
  ): Promise<CourseSectionProgress[]> {
    const count = await this.model.findMany({
      where: {
        studentId,
        sectionId: {
          in: sectionIds,
        },
        isCompleted: true,
      },
    });
    return count.map((progress) => CourseSectionProgress.fromPrimitives(progress));
  }
}
