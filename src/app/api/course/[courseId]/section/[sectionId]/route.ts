import { deleteSection } from '@/modules/CourseSection/presentation/actions/delete-section';
import { updateSection } from '@/modules/CourseSection/presentation/actions/update-section';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
export const PUT = async (
  req: NextRequest,
  { params: { courseId, sectionId } }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();
    const values = await req.json();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    await updateSection(courseId, sectionId, values);
    return NextResponse.json({ message: 'Section created' }, { status: 200 });
  } catch (error) {
    console.log('[EDIT SECTION ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params: { courseId, sectionId } }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await deleteSection(courseId, sectionId, userId);

    return new NextResponse('Section deleted successfully', { status: 200 });
  } catch (error) {
    console.log('[DELETE SECTION ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
