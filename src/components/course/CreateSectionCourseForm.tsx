'use client'
import { Course, CourseSection } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import CourseSectionList from "./CourseSectionList";

const createSectionCourseSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
})

interface CreateSectionCourseFormProps {
  course: Course & { sections: CourseSection[] };
}

const CreateSectionCourseForm = ({ course }: CreateSectionCourseFormProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const routes = [
    { label: 'Basic Information', path: `/instructor/courses/${course.id}/basic` },
    { label: 'Curriculum', path: `/instructor/courses/${course.id}/sections` },
  ]
  const form = useForm<z.infer<typeof createSectionCourseSchema>>({
    resolver: zodResolver(createSectionCourseSchema),
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createSectionCourseSchema>) => {
    try {
      const response = await axios.post(`/api/course/${course.id}/section`, values);
      router.push(`/instructor/courses/${course.id}/sections/${response.data.id}`);
      toast.success('Section created successfully');
    } catch (error) {
      toast.error('Failed to create section');
      console.log('[CreateSectionCourseForm]', error);
    }
  }

  const onReorder = async (updateData: { id: string, position: number }[]) => {
    try {
      await axios.put(`/api/course/${course.id}/section/reorder`, { list: updateData });
      toast.success('Sections reordered successfully');
    } catch (error) {
      toast.error('Failed to reorder sections');
      console.log('[CreateSectionCourseForm]', error);
    }
  }

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <div className="flex gap-5">
          {
            routes.map((route) => (
              <Link href={route.path} key={route.path} className="flex gap-4">
                <Button variant={pathName === route.path ? 'default' : 'outline'}>{route.label}</Button>
              </Link>
            ))
          }
        </div>
      </div>  
      <CourseSectionList 
        items={course.sections || []} 
        onReorder={onReorder} 
        onEdit={(id: string)=>{
          router.push(`/instructor/courses/${course.id}/sections/${id}`);
        }}
      />
      <h1 className="text-xl font-bold mt-5">Add new section</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Section title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Link href={`/instructor/courses/${course.id}/basic`}>
              <Button variant='outline' type='button'>Cancel</Button>
            </Link>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateSectionCourseForm;
