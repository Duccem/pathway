'use client';
import { Button } from '@/lib/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/form';
import { Input } from '@/lib/ui/input';
import { CourseSectionResource } from '@/modules/CourseSection/domain/CourseSectionResource';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { zodResolver } from '@hookform/resolvers/zod';
import { upload } from '@vercel/blob/client';
import axios from 'axios';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FileResourcePicker from '../../custom/file-resource-picker';

interface CourseSectionResourcesFormProps {
  courseId: string;
  sectionId: string;
  initialData: {
    resources: Primitives<CourseSectionResource>[];
  };
}
const formSchema = z.object({
  name: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  fileUrl: z.string().min(1, { message: 'File is required' }),
});
const CourseSectionResourcesForm = ({
  courseId,
  initialData,
  sectionId,
}: CourseSectionResourcesFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [resourceFile, setResourceFile] = useState<File>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      fileUrl: '',
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const toggleUpdating = () => setIsUpdating((current) => !current);
  const toggleCreating = () => setIsCreating((current) => !current);
  const uploadFile = async () => {
    const newVideoFile = await upload(resourceFile.name, resourceFile, {
      access: 'public',
      handleUploadUrl: `/api/course/${courseId}/section/${sectionId}/resource/upload-file`,
    });
    return newVideoFile.url;
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newId = Uuid.random().value;
      const fileUrl = await uploadFile();
      await axios.post(`/api/course/${courseId}/section/${sectionId}/resource`, {
        ...values,
        id: newId,
        fileUrl,
      });
      toast.success('Course updated successfully');
      router.refresh();
      toggleCreating();
    } catch (error) {
      toast.error('Failed to update course title');
    }
  };
  const deleteResource = async (resourceId: string) => {
    try {
      toggleUpdating();
      await axios.delete(`/api/course/${courseId}/section/${sectionId}/resource/${resourceId}`);
      toast.success('Resource deleted successfully');
      router.refresh();
    } catch (error) {
      console.log('[DELETE RESOURCE ERROR]', error);
      toast.error('Failed to delete resource');
    } finally {
      toggleUpdating();
    }
  };
  return (
    <div className="mt-6 border rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}
      <div className="font-bold flex items-center justify-between">
        Course Resource
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
        initialData.resources.length === 0 ? (
          <>
            <p className="italic text-slate-500">No resources added</p>
          </>
        ) : (
          <>
            {initialData.resources.map((resource) => (
              <div
                className="flex justify-between bg-[#dfcbfa] rounded-lg text-sm font-medium p-3 mt-3"
                key={resource.id}
              >
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-4" />
                  {resource.name}
                </div>
                <button
                  className="text-[#9747FF]"
                  disabled={isSubmitting}
                  onClick={() => deleteResource(resource.id)}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                </button>
              </div>
            ))}
          </>
        )
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g HTML Basics" {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileResourcePicker
                      value={field.value || ''}
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                      onSelectFile={(file: File) => setResourceFile(file)}
                    />
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

export default CourseSectionResourcesForm;
