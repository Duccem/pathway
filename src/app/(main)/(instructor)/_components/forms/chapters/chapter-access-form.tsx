'use client';
import { Button } from '@/lib/ui/button';
import { Checkbox } from '@/lib/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/lib/ui/form';
import { cn } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, Pencil, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface CourseSectionAccessFormProps {
  courseId: string;
  sectionId: string;
  initialData: {
    isFree: boolean;
  };
}
const formSchema = z.object({
  isFree: z.boolean().optional(),
});
const CourseSectionAccessForm = ({ courseId, initialData, sectionId }: CourseSectionAccessFormProps) => {
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
      await axios.put(`/api/course/${courseId}/section/${sectionId}`, values);
      toast.success('Course updated successfully');
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Failed to update course title');
    }
  };
  return (
    <div className="mt-6 border bg-ducen-secondary rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Chapter Accessability
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
        <div className={cn('text-sm mt-2', !initialData.isFree ? 'text-slate-500 italic' : 'font-bold italic')}>
          {initialData.isFree ? (
            <p>This chapter is free open to preview</p>
          ) : (
            <p>This chapter is not free and requires payment to access</p>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for all students to preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CourseSectionAccessForm;
