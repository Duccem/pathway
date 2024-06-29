import { Category } from './Category';
import { Course } from './Course';

export interface CourseRepository {
  listMyCoursesCreated(userId: string): Promise<Course[]>;
  getCourseById(courseId: string, userId: string): Promise<Course>;
  getCoursesByCategory(categoryId: string | null): Promise<Course[]>;
  searchCourses(query: string): Promise<Course[]>;
  saveCourse(course: Course): Promise<void>;
  getCourseCategories(): Promise<Category[]>;
  deleteCourse(courseId: string): Promise<void>;
  getPurchasedCourses(courseIds: string[]): Promise<Course[]>;
}
