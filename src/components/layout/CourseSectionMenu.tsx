import { Course, CourseSection } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

interface SectionMenuProps {
  course: Course & { sections: CourseSection[] };
}

const CourseSectionMenu = ({ course }: SectionMenuProps) => {
  return (
    <div className="z-60 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button>Sections</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
        <p className="text-sm px-1 font-bold text-[#9747FF] mt-4">COURSE NAVIGATION</p>
          <Link
            href={`/courses/${course.id}/overview`}
            className={`p-1 rounded-lg hover:bg-[#dfcbfa]`}
          >
            Overview
          </Link>
          <p className="text-sm px-1 font-bold text-[#9747FF] mt-4">SECTIONS</p>
          {course.sections.map((section) => (
            <Link
              key={section.id}
              href={`/courses/${course.id}/section/${section.id}`}
              className="p-1 rounded-lg hover:bg-[#dfcbfa]"
            >
              <SheetClose>{section.title}</SheetClose>
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CourseSectionMenu;