import { PrismaClient } from '@prisma/client';
import { Category } from '../domain/Category';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class PrismaCourseRepository implements CourseRepository {
  constructor(private client: PrismaClient) {}
  deleteCourse(courseId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  get model() {
    return this.client.course;
  }

  async listMyCoursesCreated(userId: string): Promise<Course[]> {
    const courses = await this.model.findMany({
      where: {
        instructorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return courses ? courses.map((course) => Course.fromPrimitives(course)) : [];
  }
  async getCourseById(courseId: string, userId: string): Promise<Course> {
    const course = await this.model.findUnique({
      where: { id: courseId, instructorId: userId },
    });
    return course ? Course.fromPrimitives(course) : null;
  }
  async getCoursesByCategory(categoryId: string): Promise<Course[]> {
    let whereClause: any = categoryId ? { categoryId } : {};
    const courses = await this.model.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return courses ? courses.map((course) => Course.fromPrimitives(course)) : [];
  }
  async searchCourses(query: string): Promise<Course[]> {
    const courses = await this.model.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            subtitle: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });
    return courses ? courses.map((course) => Course.fromPrimitives(course)) : [];
  }
  async saveCourse(course: Course): Promise<void> {
    const { category, subCategory, level, ...courseData } = course.toPrimitives();
    await this.model.upsert({
      where: { id: course.id },
      update: courseData,
      create: courseData,
    });
  }
  async getCourseCategories(): Promise<Category[]> {
    const categories = await this.client.category.findMany();
    return categories ? categories.map((category) => Category.fromPrimitives(category)) : [];
  }

  async getPurchasedCourses(courseIds: string[]): Promise<Course[]> {
    const courses = await this.model.findMany({
      where: {
        id: {
          in: courseIds,
        },
      },
    });
    return courses ? courses.map((course) => Course.fromPrimitives(course)) : [];
  }
}
