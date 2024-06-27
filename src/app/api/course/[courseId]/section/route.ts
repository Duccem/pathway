import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { courseId } = params;
    const course = await db.course.findUnique({
      where: { id: courseId, instructorId: userId },
    });
    if (!course) {
      return new NextResponse('Not Found', { status: 404 });
    }
    const lastSection = await db.courseSection.findFirst({
      where: { courseId },
      orderBy: { position: 'desc' },
    });

    const newPosition = lastSection ? lastSection.position + 1 : 0;
    const values = await req.json();
    const newSection = await db.courseSection.create({
      data: {
        courseId,
        position: newPosition,
        ...values,
      },
    });
    return NextResponse.json(newSection, { status: 201 });
  } catch (error) {
    console.log('[SECTION_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
