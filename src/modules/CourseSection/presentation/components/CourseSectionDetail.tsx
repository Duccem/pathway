'use client';
import PurchaseCourse from '@/modules/Course/presentation/components/course/PurchaseCourse';
import MuxPlayer from '@mux/mux-player-react';
import {
  Course,
  CoursePurchase,
  CourseSection,
  CourseSectionProgress,
  CourseSectionResource,
  MuxData,
} from '@prisma/client';
import { File, Lock } from 'lucide-react';
import Link from 'next/link';
import ReadText from '../../../shared/presentation/components/ReadText';
import CompleteCourseSection from './CompleteCourseSection';
import CourseSectionMenu from './CourseSectionMenu';

interface SectionsDetailsProps {
  course: Course & { sections: CourseSection[] };
  section: CourseSection;
  purchase: CoursePurchase | null;
  muxData: MuxData | null;
  resources: CourseSectionResource[] | [];
  progress: CourseSectionProgress | null;
}
const CourseSectionDetail = ({
  course,
  section,
  purchase,
  muxData,
  resources,
  progress,
}: SectionsDetailsProps) => {
  const isLocked = !section.isFree && !purchase;
  return (
    <div className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex gap-4">
          <CourseSectionMenu course={course} />
          {!purchase ? (
            <PurchaseCourse courseId={course.id} />
          ) : (
            <CompleteCourseSection
              courseId={course.id}
              sectionId={section.id}
              isCompleted={!!progress?.isCompleted}
            />
          )}
        </div>
      </div>
      <div className="flex max-md:flex-col gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>
          {isLocked ? (
            <div className="px-10 py-10 my-10 rounded-lg flex flex-col gap-5 items-center bg-[#dfcbfa]">
              <Lock className="h-8 w-8" />
              <p className="text-sm font-bold">
                Vide for this section is locked!. Please purchase the course to
                unlock this section.
              </p>
            </div>
          ) : (
            <div className="px-10 py-10 flex flex-col gap-5 items-start justify-start">
              <MuxPlayer
                playbackId={muxData?.playbackId || ''}
                className="md:max-w-[600px] border-2 rounded-lg border-[#9747FF]"
              />
            </div>
          )}
          <ReadText
            value={section.description || 'Description not available'}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-5">Resources</h2>
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={resource.fileUrl}
              target="_blank"
              className="flex items-center bg-[#dfcbfa] rounded-lg text-sm font-medium p-3"
            >
              <File className="h-4 w-4 mr-4" />
              {resource.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSectionDetail;
