import { unpublishCourse } from '@/modules/Course/presentation/actions/unpublish-course';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await unpublishCourse(courseId, userId);

    return NextResponse.json({ message: 'Course unpublished' }, { status: 200 });
  } catch (err) {
    console.log('[courseId_unpublish_POST]', err);
    return new Response('Internal Server Error', { status: 500 });
  }
};
