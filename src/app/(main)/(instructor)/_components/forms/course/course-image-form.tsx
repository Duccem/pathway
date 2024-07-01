'use client';
import { Button } from '@/lib/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/lib/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upload } from '@vercel/blob/client';
import axios from 'axios';
import { Loader2, Pencil, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import ImageCoursePicker from '../../custom/image-course-picker';

interface CourseImageFormProps {
  courseId: string;
  initialData: {
    imageUrl: string;
  };
}
const formSchema = z.object({
  imageUrl: z.string().optional(),
});
const CourseImageForm = ({ courseId, initialData }: CourseImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [courseImageFile, setCourseImageFile] = useState<File>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const uploadImage = async () => {
    const newVideoFile = await upload(courseImageFile.name, courseImageFile, {
      access: 'public',
      handleUploadUrl: `/api/course/${courseId}/upload-img`,
    });
    console.log(newVideoFile);
    return newVideoFile.url;
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = values.imageUrl;
      if (initialData.imageUrl !== values.imageUrl) {
        imageUrl = await uploadImage();
      }
      await axios.put(`/api/course/${courseId}`, {...values, imageUrl });
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
        Course Banner
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
        <div className="w-[500px] aspect-video mx-auto border border-dashed p-2 border-slate-400 rounded-lg">
          {initialData.imageUrl ? (
            <img
              src={initialData.imageUrl}
              alt="course-image"
              className="w-full  object-contain rounded-lg"
            />
          ) : (
            <img
              src="/images/image_placeholder.webp"
              alt="course-image"
              className="w-full object-contain rounded-lg"
            />
          )}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-[500px] mx-auto">
                      <ImageCoursePicker
                        value={field.value || ''}
                        onChange={(url) => {
                          console.log('CHANGING');
                          field.onChange(url)
                        }}
                        onSelectFile={(file: File) => setCourseImageFile(file)}
                      />
                    </div>
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

export default CourseImageForm;
