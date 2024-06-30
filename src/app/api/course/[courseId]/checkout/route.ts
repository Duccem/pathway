import { createPurchaseSession } from '@/modules/CoursePurchase/presentation/actions/create-purchase-session';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest, { params: { courseId } }: { params: { courseId: string } }) => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0].emailAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { url } = await createPurchaseSession(user.id, user.emailAddresses[0].emailAddress, courseId);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.log('ERROR ON CHECKOUT', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
