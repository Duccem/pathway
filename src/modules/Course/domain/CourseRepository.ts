import { Category } from './Category';
import { Course } from './Course';
import { Level } from './Level';

export interface CourseRepository {
  listMyCoursesCreated(userId: string): Promise<Course[]>;
  getCourseById(courseId: string, userId: string): Promise<Course>;
  getCoursesByCategory(categoryId: string | null, userId: string): Promise<Course[]>;
  searchCourses(query: string, userId: string): Promise<Course[]>;
  saveCourse(course: Course): Promise<void>;
  getCourseCategories(): Promise<Category[]>;
  getLevelById(levelId: string): Promise<Level>;
  getCourseLevels(): Promise<Level[]>;
  deleteCourse(courseId: string): Promise<void>;
  getPurchasedCourses(courseIds: string[]): Promise<Course[]>;
}
