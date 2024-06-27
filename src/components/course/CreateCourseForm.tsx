'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
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
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const createCourseFormSchema = z.object({
  title: z.string().min(2, { message: 'Title is required and minimum 2 characters' }),
  categoryId: z.string().min(1, { message: 'Category is required' }),
  subCategoryId: z.string().min(1, { message: 'Sub Category is required' }),
})

interface CreateCourseFormProps {
  categories: {
    label: string;
    value: string;
    subcategories: {
      label: string;
      value: string;
    }[]
  }[]
}

const CreateCourseForm = ({ categories }: CreateCourseFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createCourseFormSchema>>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      title: '',
      categoryId: '',
      subCategoryId: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createCourseFormSchema>) => {
    try {
      const response = await axios.post('/api/course', values);
      router.push(`/instructor/courses/${response.data.id}/basic`);
      toast.success('Course created successfully');
    } catch (error) {
      console.log('Failed to create course', error);
      toast.error('Failed to create course');
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Let give some basics for your course</h1>
      <p className="text-sm mt-3">It is ok if you cannot think of a good title or correct category now. You can change them later.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Course Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Combobox options={categories} {...field}/>
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
                  <Combobox options={categories.find((category) => category.value == form.watch('categoryId'))?.subcategories || []} {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )

}

export default CreateCourseForm;
