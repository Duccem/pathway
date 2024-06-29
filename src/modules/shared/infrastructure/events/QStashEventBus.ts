import { Client } from '@upstash/qstash';
import { DomainEvent, EventBus } from '../../domain/core/DomainEvent';

export class QStashEventBus implements EventBus {
  constructor(private readonly qstashClient: Client) {}
  async publish(events: DomainEvent[]): Promise<void> {
    const publishedEvents = [];
    for (const event of events) {
      const publishedEvent = this.qstashClient.publishJSON({
        url: `https://dfvpkpzq-3000.use.devtunnels.ms/api/webhooks/events/${event.eventName}`,
        body: event.toPrimitive(),
      });
      publishedEvents.push(publishedEvent);
    }
    await Promise.all(publishedEvents);
  }
}
