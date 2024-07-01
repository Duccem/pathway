import { Alert, AlertTitle } from '@/lib/ui/alert';
import { Rocket, TriangleAlert } from 'lucide-react';

interface IncompleteBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  completeFieldsCount: number;
}

const IncompleteBanner = ({
  isCompleted,
  requiredFieldsCount,
  completeFieldsCount,
}: IncompleteBannerProps) => {
  return (
    <Alert className="my-4" variant={`${isCompleted ? 'complete' : 'incomplete'}`}>
      {isCompleted ? <Rocket className="w-4 h-4" /> : <TriangleAlert className="w-4 h-4" />}
      <AlertTitle className="text-sm font-medium">
        {isCompleted
          ? `Great job! ready to publish`
          : `Complete all fields ${completeFieldsCount} / ${requiredFieldsCount}`}
      </AlertTitle>
    </Alert>
  );
};

export default IncompleteBanner;
