import { Button } from "@/lib/ui/button";
import { DataTable } from "@/lib/ui/data-table";
import { CourseTableColumns } from "@/modules/Course/presentation/components/course/CourseTableColum";
import { getCourses } from "@/modules/Course/presentation/page-actions/get-courses";

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


const CoursesPage = async () => {
  const { userId } = auth();
  if(!userId) return redirect('/sign-in');
  const courses = await getCourses(userId);
  return (
    <div className="px-6 py-4">
      <Link href='/instructor/create-course'><Button>Create new course</Button></Link>
      <div className="mt-5">
        <DataTable columns={CourseTableColumns} data={courses}/>
      </div>
    </div>
  );
}

export default CoursesPage;
