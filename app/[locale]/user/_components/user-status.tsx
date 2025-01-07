import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import {ReactNode} from "react";

export const UserStatus = ({ status ,children}: {status:UserStatus,children?: ReactNode}) => {
  const t = useTranslations('user-dashboard');
  return (
    <section className="mb-4 space-y-4 border-b pb-4">
      {/*<p>status: {status}</p>*/}

      <h2 className="heading">{t('accounts-title')}</h2>
      <div className="grid grid-cols-3 gap-4">
        <p
          className={cn(
            'flex items-center justify-center rounded-full px-3 py-2 text-center font-medium text-xs',
            status === 'normal'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground/50',
          )}
        >
          {t('normal-status-title')}
        </p>
        <p
          className={cn(
            'flex items-center justify-center rounded-full px-3 py-2 text-center font-medium text-xs',
            status === 'parent'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground/50',
          )}
        >
          {t('parent-status-title')}
        </p>
        <p
          className={cn(
            'flex items-center justify-center rounded-full px-3 py-2 text-center font-medium text-xs',
            status === 'child'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground/50',
          )}
        >
          {t('child-status-title')}
        </p>
      </div>
    </section>
  );
};
