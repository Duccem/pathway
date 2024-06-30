import { deleteSectionEvent } from '@/modules/CourseSection/presentation/actions/delete-section-event';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  try {
    const data = await req.json();
    await deleteSectionEvent(data.aggregate.courseId);
    return Response.json({ message: 'Event received' });
  } catch (error) {
    console.log('[COURSE_DELETED_EVENT_HANDLER_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
});
