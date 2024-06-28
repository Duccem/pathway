import { Course } from '@prisma/client';
import { db } from '../db';

export const getCourses = async (userId: string) => {
  const courses = await db.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return courses;
};

export const getCourse = async (courseId: string, instructorId: string) => {
  const course = await db.course.findUnique({
    where: { id: courseId, instructorId },
    include: {
      sections: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });
  return course;
};

export const getCourseSection = async (sectionId: string, courseId: string) => {
  const sections = await db.courseSection.findUnique({
    where: { id: sectionId, courseId },
    include: {
      resources: true,
      muxData: true,
    },
  });
  return sections;
};

export const getCoursesByCategory = async (
  categoryId: string | null,
  search: string | null
): Promise<Course[]> => {
  let whereClause: any = categoryId ? { categoryId } : {};
  whereClause = search
    ? { ...whereClause, title: { contains: search } }
    : whereClause;
  const courses = await db.course.findMany({
    where: whereClause,
    include: {
      category: true,
      subCategory: true,
      sections: {
        where: { isPublished: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return courses;
};
