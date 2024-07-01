'use client'
import { Button } from "@/lib/ui/button";
import { Combobox } from "@/lib/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/lib/ui/form";
import { cn } from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CourseCategoryFormProps {
  courseId: string;
  initialData: {
    categoryId: string;
    subCategoryId: string;
  };
  categories: {
    label: string;
    value: string;
    subcategories: {
      label: string;
      value: string;
    }[]
  }[];
}
const formSchema = z.object({
  categoryId: z.string().min(1, { message: 'Category is required' }),
  subCategoryId: z.string().min(1, { message: 'Sub Category is required' }),
});
const CourseCategoryForm = ({ courseId, initialData, categories }: CourseCategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`/api/course/${courseId}`, values);
      toast.success('Course updated successfully');
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Failed to update course title');
    }
  };
  const selectedCategory = categories.find(category => category.value === initialData.categoryId);
  const selectedSubCategory = selectedCategory?.subcategories.find(subcategory => subcategory.value === initialData.subCategoryId);
  return (
    <div className="mt-6 border bg-ducen-secondary rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Course Category & Subcategory
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <>
          <p className={cn('text-sm mt-2', !initialData.categoryId && 'text-slate-500')}>
            <span className="font-bold mr-2">Category:</span> 
            {selectedCategory.label || 'No category '}
          </p>
          <p className={cn('text-sm mt-2', !initialData.categoryId && 'text-slate-500')}>
            <span className="font-bold mr-2">
              Subcategory:
            </span>
            {selectedSubCategory.label|| 'No category '}
          </p>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="flex justify-start items-center gap-3">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormControl>
                    <Combobox options={categories.find((category) => category.value == form.watch('categoryId'))?.subcategories || []} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                { isSubmitting ? (<Loader2 className='h-4 w-4 animate-spin'/>) : 'Save' }
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default CourseCategoryForm;
