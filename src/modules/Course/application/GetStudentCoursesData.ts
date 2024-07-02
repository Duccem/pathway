import { GetPurchases } from '@/modules/CoursePurchase/application/GetPurchases';
import { GetCourseProgress } from '@/modules/CourseSectionProgress/application/GetCourseProgress';
import { CourseRepository } from '../domain/CourseRepository';

export class GetStudentCoursesData {
  constructor(
    public readonly repository: CourseRepository,
    private purchaseList: GetPurchases,
    private progressSearcher: GetCourseProgress
  ) {}

  async run(studentId: string) {
    const purchases = await this.purchaseList.run(studentId);
    const coursesList = purchases.map((purchase) => purchase.courseId);
    const courses = await this.repository.getPurchasedCourses(coursesList);
    const coursesInProgress = [];
    const coursesCompleted = [];
    const coursesNotStarted = [];
    for (const course of courses) {
      const progress = await this.progressSearcher.run(course.id, studentId);
      if (progress == 100) {
        coursesCompleted.push(course);
      } else if (progress == 0) {
        coursesNotStarted.push(course);
      } else {
        coursesInProgress.push(course);
      }
    }
    return {
      coursesCompleted,
      coursesInProgress,
      coursesNotStarted,
    };
  }
}
