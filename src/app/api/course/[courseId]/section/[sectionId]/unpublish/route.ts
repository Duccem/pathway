import { unpublishSection } from '@/modules/CourseSection/presentation/actions/unpublish-section';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { courseId, sectionId } = params;

    await unpublishSection(courseId, sectionId, userId);

    return NextResponse.json({ message: 'Section unpublished' }, { status: 200 });
  } catch (err) {
    console.log('[sectionId_unpublish_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
