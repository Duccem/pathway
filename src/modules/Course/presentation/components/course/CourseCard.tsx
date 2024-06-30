import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Gem } from "lucide-react";
import Link from "next/link";
import { getLevel } from "../../page-actions/get-level";

interface CourseCardProps {
  course: Course;
}
const CourseCard = async ({ course }: CourseCardProps) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);
  let level;
  if (course.levelId) {
    level = await getLevel(course.levelId);
  }
  return (
    <Link href={`/courses/${course.id}/overview`} className="border rounded-lg cursor-pointer">
      <img src={course.imageUrl ? course.imageUrl : '/images/image_placeholder.webp'} alt={course.title} height={500} width={500}
        className="rounded-t-xl w-[320px] h-[180px] object-contain object-center"
      />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-lg font-bold hover:text-[#9747FF]">{course.title}</h2>
        <div className="flex justify-between text-sm font-medium">
          {
            instructor && (
              <div className="flex gap-2 items-center">
                <img 
                  src={instructor.imageUrl ? instructor.imageUrl : '/images/avatar_placeholder.jpg'} 
                  alt={instructor.fullName || 'Instructor photo'} 
                  height={24}
                  width={24}
                  className="rounded-full"
                />
                <p className="">
                  {instructor.fullName}
                </p>
              </div>
            )
          }
          {
            level && (
              <div>
                <Gem size={20}/>
                <p>{level.name}</p>
              </div>
            )
          }
        </div>
        <p className="text-sm font-bold">${course.price}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
