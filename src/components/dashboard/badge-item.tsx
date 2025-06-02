import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeItemProps {
  name: string;
  icon: LucideIcon;
  description: string;
  achieved?: boolean;
}

export default function BadgeItem({ name, icon: Icon, description, achieved = true }: BadgeItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`p-3 flex flex-col items-center justify-center aspect-square transition-all duration-300 ${achieved ? 'opacity-100 border-primary shadow-md' : 'opacity-50 bg-muted'}`}>
            <Icon className={`h-10 w-10 mb-2 ${achieved ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className={`text-xs font-medium text-center ${achieved ? 'text-foreground' : 'text-muted-foreground'}`}>{name}</p>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
          {!achieved && <p className="text-xs text-muted-foreground">(Not yet achieved)</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
