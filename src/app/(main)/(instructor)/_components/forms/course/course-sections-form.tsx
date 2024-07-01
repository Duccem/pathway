'use client';
import { Button } from '@/lib/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/lib/ui/form';
import { Input } from '@/lib/ui/input';
import { CourseSection } from '@/modules/CourseSection/domain/CourseSection';
import CourseSectionList from '@/modules/CourseSection/presentation/components/CourseSectionList';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface CourseSectionFormProps {
  courseId: string;
  initialData: {
    sections: Primitives<CourseSection>[];
  };
}
const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
});
const CourseSectionForm = ({ courseId, initialData }: CourseSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const toggleUpdating = () => setIsUpdating((current) => !current);
  const toggleCreating = () => setIsCreating((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newId = Uuid.random().value;
      await axios.post(`/api/course/${courseId}/section`, {...values, id: newId });
      toast.success('Course updated successfully');
      router.refresh();
      toggleCreating()
    } catch (error) {
      toast.error('Failed to update course title');
    }
  };
  const onReorder = async (updateData: { id: string, position: number }[]) => {
    try {
      toggleUpdating();
      await axios.put(`/api/course/${courseId}/section/reorder`, { list: updateData });
      toast.success('Sections reordered successfully');
    } catch (error) {
      toast.error('Failed to reorder sections');
      console.log('[CreateSectionCourseForm]', error);
    } finally {
      toggleUpdating();
    }
  }
  return (
    <div className="mt-6 border bg-ducen-secondary rounded-md p-4 relative">
      { isUpdating && (
        <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
          <Loader2  className='animate-spin h-6 w-6'/>
        </div>
      ) }
      <div className="font-bold flex items-center justify-between">
        Course Chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {!isCreating ? (
        initialData.sections.length === 0 ? (
          <>
            <p className='italic text-slate-500'>No chapters</p>
            <p className='italic text-slate-700'>Drag and drop to reorder chapters</p>
          </>
        ) : (
          <>
            
            <CourseSectionList
              items={initialData.sections || []}
              onReorder={onReorder}
              onEdit={(id: string) => {
                router.push(`/instructor/courses/${courseId}/sections/${id}`);
              }}
            />
            <p className='italic text-slate-700'>Drag and drop to reorder chapters</p>
          </>
        )
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="What is this course about" {...field}></Input>
                  </FormControl>
                  <FormMessage />
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

export default CourseSectionForm;
