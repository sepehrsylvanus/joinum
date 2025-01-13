import { TelegramIcon } from '@/components/icons/telegram';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOrderValue, useSetOrder } from '@/hooks/use-order';
import { useMutation } from '@tanstack/react-query';
import { LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { InfoModal } from './info-modal';
import { useFormContext } from 'react-hook-form';

const useCheckChannel = () => {
  return useMutation({
    mutationKey: ['check-channel'],
    mutationFn: async (link: string) => {
      const res = await fetch('/api/v1/orders/checkLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BASE_TOKEN}`,
        },
        body: JSON.stringify({ link }),
      });
      const result = await res.json();
      return result.data;
    },
  })
}

export function OrderLink() {
  const {register} = useFormContext()
  const link = useOrderValue().link;
  const setOrder = useSetOrder();
  const [checkBox, setCheckBox] = useState(false);
  const t = useTranslations('new-order');
  const { mutateAsync, isPending } = useCheckChannel()
  const onCheckChannel = async () => {
    setCheckBox(!checkBox)
    const res = await mutateAsync(link)
  }

  return (
    <section className="grid gap-4">
      <h2 className="heading">
        1. {t('step-one-title')}
        <InfoModal
          body={
            <ul className="list-decimal space-y-2 p-4">
              <li className="text-xs/5">
                We don't ban porn or illegal content on our platform, but we
                label it as NSFW and show it only to users who have enabled NSFW
                content in their profiles.
              </li>
              <li className="text-xs/5">
                We detect NSFW or +18 content through channel names and posts
                Cheating the platform results in a deletion of bid.
              </li>
            </ul>
          }
        />
      </h2>
      <div className="flex items-center gap-2">
        <Input
          className="flex-1 bg-muted/50"
          placeholder={t('check-placeholder')}
          value={link}
          onChange={(e) =>
            setOrder((prev) => ({ ...prev, link: e.target.value }))
          }
          
        />
        <Button disabled={isPending} type="button" onClick={onCheckChannel}>
          {t('check-btn')}
        </Button>
      </div>
      {Boolean(checkBox) && (
        <>
          <span className="text-right font-semibold text-muted-foreground text-xs">
            NSFW: Yes/NO
          </span>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium text-sm">
              <TelegramIcon className="size-5 text-blue-500" />
              Name: Soheil Ghanbary
            </div>
            <div className="flex items-center gap-2 font-medium text-sm">
              <LinkIcon className="size-5 text-blue-500" />
              Link: t.me/soheilghanbary
            </div>
          </div>
        </>
      )}
    </section>
  );
}
