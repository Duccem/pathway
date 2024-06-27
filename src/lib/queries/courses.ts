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

export const getCourse = async (
  courseId: string,
  instructorId: string
): Promise<Course | null> => {
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
