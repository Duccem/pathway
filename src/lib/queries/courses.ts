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
  categoryId: string | null
): Promise<Course[]> => {
  let whereClause: any = categoryId ? { categoryId } : {};
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

export const getSectionResources = async (sectionId: string) => {
  const resources = await db.courseSectionResource.findMany({
    where: {
      sectionId,
    },
  });
  return resources;
};

export const getSectionMuxData = async (sectionId: string) => {
  const muxData = await db.muxData.findUnique({
    where: {
      sectionId,
    },
  });
  return muxData;
};

export const getUserSectionProgress = async (
  userId: string,
  sectionId: string
) => {
  const progress = await db.courseSectionProgress.findUnique({
    where: {
      studentId_sectionId: {
        studentId: userId,
        sectionId,
      },
    },
  });
  return progress;
};

export const createCourseSectionProgress = async (
  studentId: string,
  sectionId: string,
  isCompleted: boolean
) => {
  await db.courseSectionProgress.upsert({
    where: {
      studentId_sectionId: {
        studentId,
        sectionId,
      },
    },
    update: {
      isCompleted,
    },
    create: {
      studentId,
      sectionId,
      isCompleted,
    },
  });
};

export const courseSectionProgressCompletedCount = async (
  studentId: string,
  publishedSectionsIds: string[]
) => {
  const count = await db.courseSectionProgress.count({
    where: {
      studentId,
      sectionId: {
        in: publishedSectionsIds,
      },
      isCompleted: true,
    },
  });
  return count;
};

export const searchCourses = async (search: string) => {
  const courses = await db.course.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          subtitle: {
            contains: search,
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
  return courses;
};
