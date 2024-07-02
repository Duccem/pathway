import { PrismaClient } from '@prisma/client';
import { Category } from '../domain/Category';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { Level } from '../domain/Level';

export class PrismaCourseRepository implements CourseRepository {
  constructor(private client: PrismaClient) {}

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
  async getCoursesByCategory(categoryId: string, userId: string): Promise<Course[]> {
    let whereClause: any = categoryId ? { categoryId } : {};
    whereClause = userId ? { ...whereClause, instructorId: { not: userId } } : whereClause;
    const courses = await this.model.findMany({
      where: { isPublished: true, ...whereClause },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return courses ? courses.map((course) => Course.fromPrimitives(course)) : [];
  }
  async searchCourses(query: string, userId: string): Promise<Course[]> {
    const whereClause = userId ? { instructorId: { not: userId } } : {};
    const courses = await this.model.findMany({
      where: {
        ...whereClause,
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
      create: {
        id: courseData.id,
        title: courseData.title,
        categoryId: courseData.categoryId,
        subCategoryId: courseData.subCategoryId,
        instructorId: courseData.instructorId,
      },
    });
  }
  async getCourseCategories(): Promise<Category[]> {
    const categories = await this.client.category.findMany({
      include: {
        subcategories: true,
      },
    });
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
  async getCourseLevels(): Promise<Level[]> {
    const levels = await this.client.level.findMany();
    return levels ? levels.map((level) => Level.fromPrimitives(level)) : [];
  }
  async deleteCourse(courseId: string): Promise<void> {
    await this.model.delete({
      where: { id: courseId },
    });
  }

  async getLevelById(levelId: string): Promise<Level> {
    const level = await this.client.level.findUnique({
      where: { id: levelId },
    });
    return level ? Level.fromPrimitives(level) : null;
  }

  async filterCoursesByCategoryAndTerm(categoryId: string, term: string, userId: string): Promise<Course[]> {
    let whereClause: any = categoryId ? { categoryId } : {};
    whereClause = userId ? { ...whereClause, instructorId: { not: userId } } : whereClause;
    whereClause = term
      ? {
          ...whereClause,
          OR: [
            {
              title: {
                contains: term,
                mode: 'insensitive',
              },
            },
            {
              subtitle: {
                contains: term,
                mode: 'insensitive',
              },
            },
          ],
        }
      : whereClause;
    const courses = await this.model.findMany({
      where: {
        isPublished: true,
        ...whereClause,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return courses ? courses.map((course) => Course.fromPrimitives(course)) : [];
  }
}
