import { VariantProps, cva } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import { cn } from '../utils/utils';

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-[#dfcbfa]",
        success: "bg-[#22a094]",
      },
      iconVariant: {
        default: "text-[#9747FF]",
        success: "text-[#fff]",
      },
      size: {
        default: "p-2",
        sm: "p-1",
        lg: 'p-3'
      }
    },
    defaultVariants: {
      variant: "default",
      iconVariant: "default",
      size: 'default'
    }
  }
)

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-[#000]",
        success: "text-[#fff]",
      },
      size: {
        default: "w-8 h-8",
        sm: "w-4 h-4",
        lg: 'w-16 h-16'
      }
    },
    defaultVariants: {
      variant: "default",
      size: 'default'
    }
  }
)

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface BadgeIconProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, size, variant }: BadgeIconProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))}/>
    </div>
  )
}