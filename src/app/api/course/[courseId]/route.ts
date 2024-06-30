import { deleteCourse } from '@/modules/Course/presentation/actions/delete-course';
import { updateCourse } from '@/modules/Course/presentation/actions/update-course';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
export const PUT = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const values = await req.json();
    const { courseId } = params;
    await updateCourse(values, courseId, userId);
    return NextResponse.json({ message: 'Course updated' }, { status: 200 });
  } catch (error) {
    console.error('[COURSE_PUT]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await deleteCourse(courseId, userId);

    return new NextResponse('Course Deleted', { status: 200 });
  } catch (err) {
    console.error(['courseId_DELETE', err]);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
