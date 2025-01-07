import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrder } from "@/hooks/use-order";
import { useTranslations } from "next-intl";
import { InfoModal } from "./info-modal";

export function OrderDuration() {
  const [order, setOrder] = useOrder()
  const t = useTranslations('new-order');
  return (
    <section className="grid gap-4">
      <h2 className="heading">
        4. {t('step-four-title')}:
        <InfoModal
          body={
            <ul className="list-decimal space-y-2 p-4">
              <li className="text-xs/5">
                If you select normal users, the weekly option is not
                available.
              </li>
              <li className="text-xs/5">
                Rates are per 1,000 users per month. If you Choose $10 as
                price and choose a one- week stay on your channel, you will
                pay $2.50.
              </li>
              <li className="text-xs/5">
                A higher bid price improves your ad's visibility, increasing
                its chances of reaching more people.
              </li>
            </ul>
          }
        />
      </h2>
      <RadioGroup defaultValue="1week" onValueChange={e => setOrder({ ...order, options: { ...order.options, sub_duration: e } })} className="flex flex-row flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="renew" id="renew" />
          <Label htmlFor="renew">Renew monthly from wallet (recommended )</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="1week" id="1week" />
          <Label htmlFor="1week">1 Week</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="2week" id="2week" />
          <Label htmlFor="2week">2 Week</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="1month" id="1month" />
          <Label htmlFor="1month">1 Month</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="3month" id="3month" />
          <Label htmlFor="3month">3 Month</Label>
        </div>
      </RadioGroup>
    </section>
  )
}