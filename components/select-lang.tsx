'use client';
import {
  ChinaFlag,
  IndiaFlag,
  IranFlag,
  SaudiaArabia,
  UnitedKingdomFlag,
} from '@/components/icons/flags';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LanguagesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function SelectLang() {
  const h = useTranslations('home');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="my-4 gap-2">
          <LanguagesIcon className="size-4" />
          {h('langbtn')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href={'/fa'}>
            <IranFlag className="size-5" />
            Persian
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href={'/en'}>
            <UnitedKingdomFlag className="size-5" />
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href={'/ar'}>
            <SaudiaArabia className="size-5" />
            Arabic
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href={'/ch'}>
            <ChinaFlag className="size-5" />
            Chinese
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href={'/in'}>
            <IndiaFlag className="size-5" />
            Hindi
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
