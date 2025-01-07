'use client';
import { TextField } from '@/components/text-field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOrder } from '@/hooks/use-order';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { InfoModal } from './info-modal';

const PremiumSubscribers = () => {
  const [order, setOrder] = useOrder();
  return (
    <TextField
      type="number"
      label="Premium subscribers $"
      placeholder="Premium subscribers $"
      value={order.options.premium_sub_price}
      onChange={(e) =>
        setOrder((prev) => ({
          ...prev,
          options: {
            ...prev.options,
            premium_sub_price: Number.parseInt(e.target.value),
          },
        }))
      }
    />
  );
};

const NormalSubscribers = () => {
  const [order, setOrder] = useOrder();
  return (
    <TextField
      type="number"
      label="Normal subscribers $"
      placeholder="Normal subscribers $"
      value={order.options.normal_sub_price}
      onChange={(e) =>
        setOrder((prev) => ({
          ...prev,
          options: {
            ...prev.options,
            normal_sub_price: Number.parseInt(e.target.value),
          },
        }))
      }
    />
  );
};

export function OrderPrice() {
  const t = useTranslations('new-order');
  const [showType, setShowType] = useState('premium');
  return (
    <section className="grid gap-4">
      <h2 className="heading">2. {t('step-two-title')}:</h2>
      <RadioGroup
        defaultValue={showType}
        onValueChange={(value) => setShowType(value)}
        className="flex items-center gap-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="premium" id="premium" />
          <Label htmlFor="premium">Premium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="normal" id="normal" />
          <Label htmlFor="normal">Normal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both" />
          <Label htmlFor="both">Both</Label>
        </div>
      </RadioGroup>
      <h2 className="heading">
        3. {t('step-three-title')}:
        <InfoModal
          body={
            <ul className="list-decimal space-y-2 p-4">
              <li className="text-xs/5">
                Rates are per 1,000 users per month.
              </li>
              <li className="text-xs/5">
                Minimum price: $7 for premium users, $1 for normal users
              </li>
              <li className="text-xs/5">
                Enter your bid amount per 1K premium users (higher bids
                increase ad visibility).
              </li>
            </ul>
          }
        />
      </h2>
      {showType === 'premium' && <PremiumSubscribers />}
      {showType === 'normal' && <NormalSubscribers />}
      {showType === 'both' && (
        <div className="grid grid-cols-2 gap-4">
          <PremiumSubscribers />
          <NormalSubscribers />
        </div>
      )}
    </section>
  );
}
