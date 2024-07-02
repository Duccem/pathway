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
import VideoSectionPicker from '../../custom/video-chapter-picker';

interface CourseSectionVideoFormProps {
  courseId: string;
  sectionId: string;
  initialData: {
    videoUrl: string;
  };
}
const formSchema = z.object({
  videoUrl: z.string().optional(),
});
const CourseSectionVideoForm = ({ courseId, initialData, sectionId }: CourseSectionVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sectionVideoFile, setSectionVideoFile] = useState<File>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const uploadVideo = async () => {
    const newVideoFile = await upload(sectionVideoFile.name, sectionVideoFile, {
      access: 'public',
      handleUploadUrl: `/api/course/${courseId}/section/${sectionId}/upload-video`,
    })
    return newVideoFile.url;
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let videoUrl = values.videoUrl;
      if (initialData.videoUrl !== values.videoUrl) {
        videoUrl = await uploadVideo();
      }
      await axios.put(`/api/course/${courseId}/section/${sectionId}`, {...values, videoUrl: videoUrl });
      toast.success('Course updated successfully');
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Failed to update course title');
    }
  };
  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Chapter Video
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
          {initialData.videoUrl ? (
            <video src={initialData.videoUrl}  controls></video>
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
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-[500px] mx-auto">
                      <VideoSectionPicker
                        value={field.value || ''}
                        onChange={(url) => {
                          console.log('CHANGING');
                          field.onChange(url)
                        }}
                        onSelectFile={(file: File) => setSectionVideoFile(file)}
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

export default CourseSectionVideoForm;
