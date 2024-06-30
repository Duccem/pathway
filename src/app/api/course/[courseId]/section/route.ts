import { createSection } from '@/modules/CourseSection/presentation/actions/create-section';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { courseId } = params;
    const values = await req.json();
    await createSection(values.id, values.title, courseId);
    return NextResponse.json({ message: 'Section created' }, { status: 201 });
  } catch (error) {
    console.log('[SECTION_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
