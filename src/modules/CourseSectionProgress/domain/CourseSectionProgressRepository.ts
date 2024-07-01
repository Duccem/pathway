import { CourseSectionProgress } from './CourseSectionProgress';

export interface CourseSectionProgressRepository {
  saveProgress(progress: CourseSectionProgress): Promise<void>;
  getUserSectionProgress(studentId: string, sectionId: string): Promise<CourseSectionProgress>;
  countCompletedSectionsProgress(studentId: string, sectionIds: string[]): Promise<CourseSectionProgress[]>;
}
