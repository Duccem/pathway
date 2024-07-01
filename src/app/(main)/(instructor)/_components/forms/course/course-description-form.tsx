'use client';
import { Button } from '@/lib/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/lib/ui/form';
import { RichEditor } from '@/lib/ui/rich-editor';
import ReadText from '@/modules/shared/presentation/components/ReadText';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, Pencil, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface CourseDescriptionFormProps {
  courseId: string;
  initialData: {
    description: string;
  };
}
const formSchema = z.object({
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
});
const CourseDescriptionForm = ({ courseId, initialData }: CourseDescriptionFormProps) => {
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
  return (
    <div className="mt-6 border bg-ducen-secondary rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Course Title
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
        !initialData.description ? (
          <p className='text-sm mt-2 text-slate-500'>No description</p>
        ) : (
          <ReadText value={initialData.description}/>
        )
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='bg-white'>
                      <RichEditor placeholder='What is this course about' {...field}></RichEditor>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
};

export default CourseDescriptionForm;
