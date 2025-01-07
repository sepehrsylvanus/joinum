'use client';
import { NavLink } from '@/components/nav-link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HomeIcon, LayoutGrid, MenuIcon, SettingsIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

const MobileMenuItem = ({ label, href, icon: Icon, onClose }: MenuItem) => (
  <NavLink
    href={href}
    onClick={onClose}
    className="flex items-center gap-2 rounded-md px-4 py-2 text-foreground/85 duration-100 hover:bg-muted"
  >
    <Icon className="size-4" />
    <span>{label}</span>
  </NavLink>
);

export const MobileMenu = () => {
  const locale = useLocale();
  const t = useTranslations('menu');
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale === 'fa' || locale === 'ar' ? 'right' : 'left'}
        className="w-64 p-0"
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-center text-primary">Joinium</SheetTitle>
        </SheetHeader>
        <div className="grid gap-1 p-2">
          <MobileMenuItem
            label={t('home')}
            href={'/user'}
            icon={HomeIcon}
            onClose={() => setOpen(false)}
          />
          <MobileMenuItem
            label={t('dashboard')}
            href={'/user/dashboard'}
            icon={LayoutGrid}
            onClose={() => setOpen(false)}
          />
          <MobileMenuItem
            label={t('settings')}
            href={'/user/settings'}
            icon={SettingsIcon}
            onClose={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
