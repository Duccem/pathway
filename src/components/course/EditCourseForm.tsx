'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "../ui/combobox";
import { Course } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { RichEditor } from "../ui/rich-editor";
import FilePicker from "../ui/file-picker";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

const editCourseFormSchema = z.object({
  title: z.string().min(2, { message: 'Title is required and minimum 2 characters' }),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, { message: 'Category is required' }),
  subCategoryId: z.string().min(1, { message: 'Sub Category is required' }),
  levelId: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().optional(),
})
interface EditCourseFormProps {
  course: Course;
  categories: {
    label: string;
    value: string;
    subcategories: {
      label: string;
      value: string;
    }[]
  }[];
  levels: {
    label: string;
    value: string;
  }[];
}
const EditCourseForm = ({ course, categories, levels }: EditCourseFormProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const form = useForm<z.infer<typeof editCourseFormSchema>>({
    resolver: zodResolver(editCourseFormSchema),
    defaultValues: {
      title: course.title,
      subtitle: course.subtitle || '',
      description: course.description || '',
      categoryId: course.categoryId,
      subCategoryId: course.subCategoryId,
      levelId: course.levelId || '',
      imageUrl: course.imageUrl || '',
      price: course.price || undefined,
    }
  });

  const onSubmit = async (values: z.infer<typeof editCourseFormSchema>) => {
    try {
      await axios.put(`/api/course/${course.id}`, values);
      toast.success('Course updated successfully');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update course');
    }
  }

  const routes = [
    { label: 'Basic Information', path: `/instructor/courses/${course.id}/basic` },
    { label: 'Curriculum', path: `/instructor/courses/${course.id}/sections` },
  ]

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
        <div className="flex gap-4 items-start">
          <Button variant='outline'>Publish</Button>
          <Button>
            <Trash className="h-4 w-4"/>
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Web development from the beginning" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Became a full stack with just ONE course" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichEditor placeholder='What is this course about' {...field}></RichEditor>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Combobox options={categories} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <Combobox options={categories.find((category) => category.value == form.watch('categoryId'))?.subcategories || []} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Combobox options={levels} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Course Banner</FormLabel>
                <FormControl>
                  <FilePicker page="edit-course" value={field.value || ''} onChange={(url) => field.onChange(url)} endpoint="courseBanner" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="29.99" {...field} type="number" step='0.01' className="max-sm:w-full w-1/4"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <Link href='/instructor/courses'>
              <Button variant='outline' type="button">Cancel</Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditCourseForm;
