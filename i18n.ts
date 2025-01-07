import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const routing = defineRouting({
  locales: ['en', 'fa', 'ar', 'ch', 'in'],
  defaultLocale: 'en',
});

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
