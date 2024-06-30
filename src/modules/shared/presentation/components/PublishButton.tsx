import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../../../lib/ui/button";

interface PublishButtonProps {
  disabled: boolean;
  courseId: string;
  sectionId?: string;
  isPublished: boolean;
  page: string;
}
const PublishButton = ({ disabled, courseId, sectionId, isPublished, page }: PublishButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    const action = isPublished ? 'unpublish' : 'publish';
    const url = page === 'course' ? `/api/course/${courseId}/${action}` :  `/api/course/${courseId}/section/${sectionId}/${action}`;
    try {
      setIsLoading(true);
      await axios.post(url);
      toast.success(`${page} ${isPublished ? 'unpublished' : 'published'} successfully`);
      router.refresh();
    } catch (error) {
      console.log(`[${isPublished ? 'UNPUBLISHING' : 'PUBLISHING'} ERROR]`, error);
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button disabled={disabled || isLoading} onClick={onClick} variant='outline'>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  );
}

export default PublishButton;
