import { unpublishOnSectionUnpublished } from '@/modules/Course/presentation/actions/unpublishOnSectionUnpublished';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  try {
    const data = await req.json();
    await unpublishOnSectionUnpublished(data.aggregate.courseId, data.aggregate.userId);
    return Response.json({ message: 'Event received' });
  } catch (error) {
    console.log('[COURSE_DELETED_EVENT_HANDLER_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
});
