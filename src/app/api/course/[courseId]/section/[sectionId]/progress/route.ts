import { createCourseSectionProgress } from '@/lib/queries/courses';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params: { sectionId } }: { params: { sectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { isCompleted } = await req.json();
    await createCourseSectionProgress(userId, sectionId, isCompleted);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log('PROGRESS POST ERROR', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
};
