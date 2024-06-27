import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
interface SaveResourceParams {
  courseId: string;
  sectionId: string;
}
export const POST = async (
  req: NextRequest,
  { params: { courseId, sectionId } }: { params: SaveResourceParams }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    const section = await db.courseSection.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) {
      return new NextResponse('Section not found', { status: 404 });
    }

    const { name, fileUrl } = await req.json();
    const resource = await db.courseSectionResource.create({
      data: {
        name,
        fileUrl,
        sectionId,
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.log('[SAVE RESOURCE ERROR]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
