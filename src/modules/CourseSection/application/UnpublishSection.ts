import { EventBus } from '@/modules/shared/domain/core/DomainEvent';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class UnpublishSection {
  constructor(private repository: CourseSectionRepository, private eventBus: EventBus) {}
  async run(courseId: string, sectionId: string, userId: string) {
    const section = await this.repository.getSection(courseId, sectionId);
    section.unpublish(userId);
    await this.repository.saveSection(section);
    this.eventBus.publish(section.pullDomainEvents());
  }
}
