import { addResource } from '@/modules/CourseSection/presentation/actions/add-resource';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
interface SaveResourceParams {
  courseId: string;
  sectionId: string;
}
export const POST = async (
  req: NextRequest,
  { params: { courseId, sectionId } }: { params: SaveResourceParams }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { name, fileUrl } = await req.json();

    await addResource(courseId, sectionId, name, fileUrl);

    return NextResponse.json({ message: 'Resource created' }, { status: 201 });
  } catch (error) {
    console.log('[SAVE RESOURCE ERROR]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
