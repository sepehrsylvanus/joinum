import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrder } from "@/hooks/use-order";
import { useTranslations } from "next-intl";
import { InfoModal } from "./info-modal";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export function OrderDuration() {
  const { control } = useFormContext();
  const [order, setOrder] = useOrder();
  const t = useTranslations("new-order");
  const duration = useWatch({
    control,
    name: "duration",
  });
  console.log({ duration });
  return (
    <section className="grid gap-4">
      <h2 className="heading">
        4. {t("step-four-title")}:
        <InfoModal
          body={
            <ul className="list-decimal space-y-2 p-4">
              <li className="text-xs/5">
                If you select normal users, the weekly option is not available.
              </li>
              <li className="text-xs/5">
                Rates are per 1,000 users per month. If you Choose $10 as price
                and choose a one- week stay on your channel, you will pay $2.50.
              </li>
              <li className="text-xs/5">
                A higher bid price improves your ad's visibility, increasing its
                chances of reaching more people.
              </li>
            </ul>
          }
        />
      </h2>
      <Controller
        name="sub_duration"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex flex-row flex-wrap gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="30" id="renew" />
              <Label htmlFor="renew">
                Renew monthly from wallet (recommended )
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="7" id="1week" />
              <Label htmlFor="1week">1 Week</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="14" id="2week" />
              <Label htmlFor="2week">2 Week</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="30" id="1month" />
              <Label htmlFor="1month">1 Month</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="90" id="3month" />
              <Label htmlFor="3month">3 Month</Label>
            </div>
          </RadioGroup>
        )}
      />
    </section>
  );
}
