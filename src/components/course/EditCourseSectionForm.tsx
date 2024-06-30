'use client'
import { Switch } from "@/components/ui/switch";
import FilePicker from "@/modules/CourseSection/components/file-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import MuxPlayer from "@mux/mux-player-react";
import { CourseSection, CourseSectionResource, MuxData } from "@prisma/client";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { RichEditor } from "../ui/rich-editor";
import CourseSectionResourceForm from "./CourseSectionResourceForm";
import DeleteCourse from "./DeleteCourse";
import PublishButton from "./PublishButton";

const editCourseSectionForm = z.object({
  title: z.string().min(2, { message: 'Title is required and minimum 2 characters' }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().optional(),
})

interface EditCourseSectionFormProps {
  section: CourseSection & { resources: CourseSectionResource[], muxData?: MuxData | null };
  courseId: string;
  isComplete: boolean;
}

const EditCourseSectionForm = ({ section, courseId, isComplete }: EditCourseSectionFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof editCourseSectionForm>>({
    resolver: zodResolver(editCourseSectionForm),
    defaultValues: {
      title: section.title,
      description: section.description || '',
      videoUrl: section.videoUrl || '',
      isFree: section.isFree,
    }
  });

  const onSubmit = async (values: z.infer<typeof editCourseSectionForm>) => {
    try {
      await axios.put(`/api/course/${courseId}/section/${section.id}`, values);
      toast.success('Section updated successfully');
      router.refresh();
    } catch (error) {
      console.log('[EDIT SECTION ERROR]', error);
      toast.error('Failed to update section');
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <div className="py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <Link href={`/instructor/courses/${courseId}/sections`}>
          <Button className="text-sm font-medium" variant='outline'>
            <ArrowLeft className="h-4 w-4 mr-2"/>
            Back to curriculum
          </Button>
        </Link>
        <div className="flex gap-4 items-start">
          <PublishButton disabled={!isComplete} courseId={courseId} sectionId={section.id} isPublished={section.isPublished} page={'section'}/>
          <DeleteCourse  courseId={courseId} sectionId={section.id} item={'section'}/>
        </div>
      </div>
      <h1 className="text-xl font-bold">Section Details</h1>
      <p className="text-sm font-medium mt-2">
        Complete this section with detailed information, good video and
        resources to give your students the best learning experience.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Introduction to web design" {...field} />
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
                <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <RichEditor placeholder='What is this course about' {...field}></RichEditor>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            section.videoUrl && (
              <div className="my-5">
                <MuxPlayer playbackId={section.muxData?.playbackId} className="md:max-w-[600px]"/>
              </div>
            )
          }
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Video <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <FilePicker page="edit-section" value={field.value || ''} onChange={(url) => field.onChange(url)} endpoint="sectionVideo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel >
                      Accessability
                    </FormLabel>
                    <FormDescription>
                      Everyone can access this section for FREE
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          <div className="flex gap-6">
            <Link href={`/instructor/courses/${courseId}/sections`}>
              <Button variant='outline' type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/>: 'Save'}
            </Button>
          </div>
        </form>
      </Form>
      <CourseSectionResourceForm courseId={courseId} section={section}/>
    </div>
  )
}

export default EditCourseSectionForm;
