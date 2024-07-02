'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/ui/alert-dialog";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface DeleteCourseProps {
  item: string;
  courseId: string;
  sectionId?: string;
}

const DeleteButton = ({ item, courseId, sectionId }: DeleteCourseProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteCourse = async () => {
    try {
      setIsDeleting(true)
      const url = item === 'course' ? `/api/course/${courseId}` : `/api/course/${courseId}/section/${sectionId}`;
      const pushedUrl = item === 'course' ? '/instructor/courses' : `/instructor/courses/${courseId}/sections`;
      await axios.delete(url);
      setIsDeleting(false);
      toast.success(`${item} deleted successfully`);
      router.push(pushedUrl);
      router.refresh();
    } catch (error) {
      console.log('[DELETE COURSE ERROR]', error);
      toast.error('Failed to delete course');
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#9747FF] text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4"/>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}. Your data will be lost forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#9747FF]" onClick={deleteCourse}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  );
}

export default DeleteButton;
