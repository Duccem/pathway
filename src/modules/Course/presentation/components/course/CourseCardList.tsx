import { Badge } from "@/lib/ui/badge";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import Link from "next/link";
import { getLevel } from "../../page-actions/get-level";

interface CourseCardProps {
  course: Course;
}
const CourseCardList = async ({ course }: CourseCardProps) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);
  let level;
  if (course.levelId) {
    level = await getLevel(course.levelId);
  }
  return (
    <Link href={`/courses/${course.id}/overview`} className="border rounded-lg cursor-pointer flex">
      <img src={course.imageUrl ? course.imageUrl : '/images/image_placeholder.webp'} alt={course.title} height={500} width={500}
        className="rounded-l-lg w-[160px] h-full object-cover object-center"
      />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-lg font-bold hover:text-[#9747FF]">{course.title}</h2>
        <div className="flex justify-between text-sm font-medium">
          {
            level && (
              <div className="flex justify-start items-center gap-4">
                <Badge className="bg-[#22a094]">{level.name}</Badge>
                <p className="text-sm font-bold">${course.price}</p>
              </div>
            )
          }
        </div>
        
      </div>
    </Link>
  );
}

export default CourseCardList;
