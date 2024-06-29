import { DomainEvent, DomainEventPrimitives } from '@/modules/shared/domain/core/DomainEvent';

export class DeletedSection extends DomainEvent {
  static EVENT_NAME = 'section.deleted';
  constructor(params: { userId: string; courseId: string; sectionId: string }) {
    super(DeletedSection.EVENT_NAME, params);
  }

  public toPrimitive(): DomainEventPrimitives {
    return {
      aggregate: this.aggregate,
      extra_data: {},
      id: this.eventId,
      occurred_on: this.occurredOn.toISOString(),
      type: DeletedSection.EVENT_NAME,
    };
  }
  public isPublic(): boolean {
    return true;
  }
}
