import { removeResource } from '@/modules/CourseSection/presentation/actions/remove-resource';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

interface DeleteResourceParams {
  sectionId: string;
  resourceId: string;
}

export const DELETE = async (
  req: NextRequest,
  { params: { resourceId, sectionId } }: { params: DeleteResourceParams }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await removeResource(resourceId, sectionId);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log('[DELETE RESOURCE ERROR]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
