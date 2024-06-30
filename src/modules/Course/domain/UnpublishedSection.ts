import { DomainEvent, DomainEventPrimitives } from '@/modules/shared/domain/core/DomainEvent';

export class UnpublishedSection extends DomainEvent {
  static EVENT_NAME = 'section_unpublished';
  constructor(params: { userId: string; courseId: string; sectionId: string }) {
    super(UnpublishedSection.EVENT_NAME, params);
  }

  public toPrimitive(): DomainEventPrimitives {
    return {
      aggregate: this.aggregate,
      extra_data: {},
      id: this.eventId,
      occurred_on: this.occurredOn.toISOString(),
      type: UnpublishedSection.EVENT_NAME,
    };
  }
  public isPublic(): boolean {
    return true;
  }
}
