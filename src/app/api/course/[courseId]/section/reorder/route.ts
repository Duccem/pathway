import { reorderSection } from '@/modules/CourseSection/presentation/actions/reorder-section';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { list } = await req.json();

    await reorderSection(list);

    return new NextResponse('Reorder successfully', { status: 200 });
  } catch (error) {
    console.log('[REORDER SECTION ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
