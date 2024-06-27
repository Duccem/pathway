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
    const values = await req.json();
    const { courseId } = params;
    const course = await db.course.update({
      where: { id: courseId, instructorId: userId },
      data: { ...values },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('[COURSE_PUT]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
