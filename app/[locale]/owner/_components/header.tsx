'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  isBack: boolean;
};

export function OwnerHeader({ title, isBack }: Props) {
  const router = useRouter();
  const locale = useLocale();
  return (
    <header className="border-b">
      <nav
        className={cn(
          'flex items-center justify-between gap-2',
          isBack ? 'p-2' : 'p-4',
        )}
      >
        {!!isBack && (
          <Button onClick={() => router.back()} variant={'ghost'} size={'icon'}>
            <ArrowLeft
              className={cn(
                'size-4',
                locale === 'fa' && 'rotate-180',
                locale === 'ar' && 'rotate-180',
              )}
            />
          </Button>
        )}
        <h2 className="grow font-bold">{title}</h2>
      </nav>
    </header>
  );
}
