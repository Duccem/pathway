import { Course } from '@/modules/Course/domain/Course';
import { FormatError } from '@/modules/shared/domain/core/errors/FormatError';
import Stripe from 'stripe';
import { CoursePurchaseService } from '../domain/CoursePurchaseService';
import { Customer } from '../domain/Customer';

export class StripePurchaseService implements CoursePurchaseService {
  constructor(private stripe: Stripe) {}
  async getCustomer(email: string): Promise<any> {
    await this.stripe.customers.create({
      email,
    });
  }
  async createSession(course: Course, customer: Customer): Promise<string> {
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
    const session = await this.stripe.checkout.sessions.create({
      customer: customer.externalId,
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}/overview?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}/overview?cancel=true`,
      metadata: {
        courseId: course.id,
        customerId: customer.id,
      },
    });
    return session.url;
  }
  async getCompletedEventData(
    rawBody: string,
    signature: string
  ): Promise<{ customerId: string; courseId: string }> {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      throw new FormatError(`Webhook error: ${err.message}`);
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session?.metadata?.customerId;
    const courseId = session?.metadata?.courseId;
    if (event.type === 'checkout.session.completed') {
      if (!customerId || !courseId) {
        throw new FormatError('Missing metadata');
      }
      return { customerId, courseId };
    } else {
      throw new FormatError(`Unhandled event type: ${event.type}`);
    }
  }
}
