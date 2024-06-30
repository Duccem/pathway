import { DeletedSection } from '@/modules/Course/domain/DeletedSection';
import { UnpublishedSection } from '@/modules/Course/domain/UnpublishedSection';
import { Aggregate } from '@/modules/shared/domain/core/Aggregate';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { CourseSectionResource } from './CourseSectionResource';
import { VideoData } from './VideoData';

export class CourseSection extends Aggregate {
  constructor(
    id: string,
    public title: string,
    public description: string,
    public videoUrl: string,
    public courseId: string,
    public position: number,
    public isPublished: boolean,
    public isFree: boolean,
    createdAt: Date,
    updatedAt: Date,
    public videoData?: VideoData,
    public resources?: CourseSectionResource[]
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromPrimitives(data: Primitives<CourseSection>) {
    return new CourseSection(
      data.id,
      data.title,
      data.description,
      data.videoUrl,
      data.courseId,
      data.position,
      data.isPublished,
      data.isFree,
      data.createdAt,
      data.updatedAt,
      data.videoData ? VideoData.fromPrimitives(data.videoData) : undefined,
      data.resources
        ? data.resources.map((resource) => CourseSectionResource.fromPrimitives(resource))
        : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      videoUrl: this.videoUrl,
      courseId: this.courseId,
      position: this.position,
      isPublished: this.isPublished,
      isFree: this.isFree,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static Create(id: string, title: string, courseId: string, position: number) {
    return new CourseSection(id, title, '', '', courseId, position, false, false, new Date(), new Date());
  }

  publish() {
    this.isPublished = true;
  }

  unpublish(userId: string) {
    this.isPublished = false;
    this.record(new UnpublishedSection({ courseId: this.courseId, sectionId: this.id, userId }));
  }

  addResource(name: string, fileUrl: string) {
    if (!this.resources) {
      this.resources = [];
    }
    this.resources.push(
      new CourseSectionResource(
        Uuid.random().value,
        name,
        fileUrl,
        this.id,
        this.courseId,
        new Date(),
        new Date()
      )
    );
  }

  updateData(data: Primitives<CourseSection>) {
    this.title = data.title;
    this.description = data.description;
    this.videoUrl = data.videoUrl;
    this.isFree = data.isFree;
  }

  createVideoData(assetId: string, playbackId: string) {
    this.videoData = new VideoData(Uuid.random().value, assetId, playbackId, this.id);
  }

  deleteSection(userId: string) {
    this.record(new DeletedSection({ courseId: this.courseId, sectionId: this.id, userId }));
  }
}
