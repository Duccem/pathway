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
