import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { InfoIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  body: ReactNode;
};

export const InfoModal = ({ body }: Props) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        size={'icon'}
        variant={'secondary'}
        className="ml-3 size-6 rounded-full"
      >
        <InfoIcon className="size-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="rounded-xl bg-black py-0 text-white dark:bg-white dark:text-black">
      {body}
    </PopoverContent>
  </Popover>
);
