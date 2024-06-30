import FilePicker from "@/modules/CourseSection/presentation/components/file-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseSection, CourseSectionResource } from "@prisma/client";
import axios from "axios";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../../../../lib/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../lib/ui/form";
import { Input } from "../../../../lib/ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  fileUrl: z.string().min(1, { message: "File is required" }),
})

interface CourseSectionResourceFormProps {
  section: CourseSection & { resources: CourseSectionResource[] };
  courseId: string;
}
const CourseSectionResourceForm = ({ courseId, section }: CourseSectionResourceFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      fileUrl: '',
    }
  })

  const { isValid, isSubmitting  } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/course/${courseId}/section/${section.id}/resource`, values);
      toast.success('Resource uploaded successfully');
      form.reset();
      router.refresh();
    } catch (error) {
      console.log('[SAVE RESOURCE ERROR]', error);
      toast.error('Failed to save resource');
    }
  }

  const deleteResource = async (resourceId: string) => {
    try {
      await axios.delete(`/api/course/${courseId}/section/${section.id}/resource/${resourceId}`);
      toast.success('Resource deleted successfully');
      router.refresh();
    } catch (error) {
      console.log('[DELETE RESOURCE ERROR]', error);
      toast.error('Failed to delete resource');
    }
  }

  return (
    <>
      <div className="flex gap-2 items-center text-xl font-bold mt-12">
        <PlusCircle />
        Add Resources (Optional)
      </div>
      <p className="text-sm font-medium mt-2">
        Add resources to this section to help students learn better.
      </p>
      <div className="mt-5 flex flex-col gap-5">
        {
          section.resources.map((resource) => (
            <div className="flex justify-between bg-[#dfcbfa] rounded-lg text-sm font-medium p-3" key={resource.id}>
              <div className="flex items-center">
                <File className="h-4 w-4 mr-4"/>
                {resource.name}
              </div>
              <button className="text-[#9747FF]" disabled={isSubmitting} onClick={() => deleteResource(resource.id)}>
                { isSubmitting ?  <Loader2 className="h-4 w-4 animate-spin"/> : <X className="h-4 w-4" />}
              </button>
            </div>
          ))
        }
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: TextBook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Upload file</FormLabel>
                  <FormControl>
                    <FilePicker page="edit-section" value={field.value || ''} onChange={(url) => field.onChange(url)} endpoint="sectionResource" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
            { isSubmitting ?  <Loader2 className="h-4 w-4 animate-spin"/> : 'Upload'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CourseSectionResourceForm;
