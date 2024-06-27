import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

interface DeleteResourceParams {
  courseId: string;
  sectionId: string;
  resourceId: string;
}

export const DELETE = async (
  req: NextRequest,
  {
    params: { courseId, resourceId, sectionId },
  }: { params: DeleteResourceParams }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId, instructorId: userId },
    });

    if (!course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    const section = await db.courseSection.findFirst({
      where: { courseId, id: sectionId },
    });

    if (!section) {
      return new NextResponse('Section not found', { status: 404 });
    }

    await db.courseSectionResource.delete({
      where: { id: resourceId, sectionId },
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log('[DELETE RESOURCE ERROR]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
