import { IconBadge } from "@/lib/custom/badge-icon";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: 'default' | 'success' | 'warning';
}
const InfoCard = (params: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge icon={params.icon} variant={params.variant}/>
      <div>
        <p className="font-medium">
          {params.label}
        </p>
        <p className="text-gray-500">
          {params.numberOfItems} { params.numberOfItems > 1 ? 'Courses' : 'Course'}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
