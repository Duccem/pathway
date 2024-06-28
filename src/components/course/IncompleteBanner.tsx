import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Rocket, Terminal, TriangleAlert } from "lucide-react";

interface IncompleteBannerProps {
  isCompleted: boolean;
  missingFieldsCount: number;
  requiredFieldsCount: number;
}

const IncompleteBanner = ({ isCompleted, missingFieldsCount, requiredFieldsCount }: IncompleteBannerProps) => {
  return (
    <Alert className="my-4" variant={`${isCompleted ? 'complete' : 'destructive'}`}>
      { isCompleted ? (<Rocket className="w-4 h-4"/>) : (<TriangleAlert className="w-4 h-4"/>) }
      <AlertTitle className="text-xs font-medium">
        {missingFieldsCount} missing field(s) / {requiredFieldsCount} required field(s) fields
      </AlertTitle>
      <AlertDescription className="text-xs">
        {
          isCompleted ? `Great job! ready to publish` : `You can only publish when all required fields are completed`
        }
      </AlertDescription>
    </Alert>

  );
}

export default IncompleteBanner;
