import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';

export function UserReferral() {
  const t = useTranslations('user-dashboard');
  const locale = useLocale();
  return (
    <section className="mb-4 space-y-4 border-b pb-4">
      <div
        dir={locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr'}
        className="flex flex-wrap items-center justify-between gap-2"
      >
        <h2 className="heading flex-1">{t('referral-title')} : </h2>
        <Button className="rounded-full">{t('share-link')}</Button>
        <Button className="rounded-full" variant={'secondary'}>
          {t('as-story')}
        </Button>
        <p className="mx-auto mt-2 text-center text-foreground/80 text-xs/6">
          {t('referral-description')}
        </p>
      </div>
    </section>
  );
}
