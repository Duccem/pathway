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
import { Button } from "../../../../lib/ui/button";


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
      <AlertDialogTrigger>
        <Button>
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4"/>}
        </Button>
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
