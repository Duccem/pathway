import { publishSection } from '@/modules/CourseSection/presentation/actions/publish-section';
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

    await publishSection(courseId, sectionId);

    return NextResponse.json({ message: 'Section published' }, { status: 200 });
  } catch (err) {
    console.log('[section_publish_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
