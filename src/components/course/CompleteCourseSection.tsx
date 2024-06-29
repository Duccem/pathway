import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CompleteCourseSectionProps {
  courseId: string;
  sectionId: string;
  isCompleted: boolean;
}
const CompleteCourseSection = ({ courseId, sectionId, isCompleted }: CompleteCourseSectionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleComplete = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/course/${courseId}/section/${sectionId}/progress`, { isCompleted: !isCompleted });
      setIsLoading(false);
      toast.success(`Section marked as ${isCompleted ? 'incomplete' : 'complete'}`);
      router.refresh();
    } catch (error) {
      console.log('PROGRESS POST ERROR', error);
      toast.error('Error marking section as complete!');
    }
  }
  return (
    <Button variant={`${isCompleted ? 'complete' : 'default'}`} onClick={handleComplete}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : isCompleted ? (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2"/>
          <span >Completed</span>
        </div>
      ) : 'Mark as complete'}
    </Button>
  );
}

export default CompleteCourseSection;
