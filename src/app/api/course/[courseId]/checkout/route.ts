import { getCourse } from '@/lib/queries/courses';
import { getPurchase } from '@/lib/queries/purchase';
import { createStripeCustomer, getStripeCustomer } from '@/lib/queries/stripeCustomer';
import stripe from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest, { params: { courseId } }: { params: { courseId: string } }) => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0].emailAddress) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await getCourse(courseId, user.id);
    if (!course) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const purchase = await getPurchase(user.id, course.id);

    if (purchase) {
      return new NextResponse('Conflict', { status: 409 });
    }

    const line_items = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: course.title,
            description: course.description || 'No description available',
          },
          unit_amount: Math.round(course.price! * 100),
        },
        quantity: 1,
      },
    ];

    let stripeCustomer = await getStripeCustomer(user.id);
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses?.[0].emailAddress,
      });
      stripeCustomer = await createStripeCustomer(user.id, customer.id);
    }
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.externalId,
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}/overview?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}/overview?cancel=true`,
      metadata: {
        courseId: course.id,
        customerId: user.id,
      },
    });
    return NextResponse.json(
      {
        url: session.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('ERROR ON CHECKOUT', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
