import { DomainEvent, DomainEventPrimitives } from '@/modules/shared/domain/core/DomainEvent';

export class DeletedCourse extends DomainEvent {
  static EVENT_NAME = 'course_deleted';
  constructor(params: { userId: string; courseId: string }) {
    super(DeletedCourse.EVENT_NAME, params);
  }

  public toPrimitive(): DomainEventPrimitives {
    return {
      aggregate: this.aggregate,
      extra_data: {},
      id: this.eventId,
      occurred_on: this.occurredOn.toISOString(),
      type: DeletedCourse.EVENT_NAME,
    };
  }
  public isPublic(): boolean {
    return true;
  }
}
