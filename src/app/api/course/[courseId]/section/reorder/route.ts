import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { list } = await req.json();
    const { courseId } = params;

    const course = await db.course.findUnique({
      where: { id: courseId, instructorId: userId },
    });

    if (!course) {
      return new NextResponse('Not Found', { status: 404 });
    }

    for (const item of list) {
      await db.courseSection.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse('Reorder successfully', { status: 200 });
  } catch (error) {
    console.log('[REORDER SECTION ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
