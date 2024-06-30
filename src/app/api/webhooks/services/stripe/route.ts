import { completePurchaseSession } from '@/modules/CoursePurchase/presentation/actions/complete-purchase-session';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const rawBody = await req.text();
  const signature = headers().get('Stripe-Signature') as string;
  try {
    await completePurchaseSession(rawBody, signature);
    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.log('[webhooks_stripe_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
