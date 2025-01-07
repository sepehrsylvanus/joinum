'use client';
import { NavLink } from '@/components/nav-link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, MenuIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export function HeaderButtonLink() {
  const locale = useLocale();
  const pathname = usePathname();

  if (pathname === `/${locale}/user/dashboard`) {
    return (
      <NavLink href={'/user'}>
        <Button variant={'ghost'} size={'icon'}>
          <ArrowLeft
            className={cn(
              'size-4',
              locale === 'fa' && 'rotate-180',
              locale === 'ar' && 'rotate-180',
            )}
          />
        </Button>
      </NavLink>
    );
  }

  return (
    <NavLink href={'/user/dashboard'}>
      <Button variant={'ghost'} size={'icon'}>
        <MenuIcon className="size-4" />
      </Button>
    </NavLink>
  );
}
