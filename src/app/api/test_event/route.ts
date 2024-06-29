import { QStashEventBus } from '@/modules/shared/infrastructure/events/QStashEventBus';
import { QStashTestEvent } from '@/modules/shared/infrastructure/events/QStashTestEvent';
import qstashClient from '@/modules/shared/presentation/qstash';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const event = new QStashTestEvent({ test: 'test' });
  const eventBus = new QStashEventBus(qstashClient);
  await eventBus.publish([event]);
  return NextResponse.json({ message: 'Event published' });
};
