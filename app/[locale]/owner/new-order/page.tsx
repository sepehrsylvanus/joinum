"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOrderValue } from "@/hooks/use-order";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { OwnerHeader } from "../_components/header";
import { OrderDuration } from "../_components/order-duration";
import { OrderLanguage } from "../_components/order-language";
import { OrderLink } from "../_components/order-link";
import { OrderPrice } from "../_components/order-price";
import { OrderRejoin } from "../_components/order-rejoin";
import { OrderYear } from "../_components/order-year";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { validateLink } from "@/actions/orders";
const useSubmitOrder = () => {
  const order = useOrderValue();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/v1/orders/submitOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BASE_TOKEN}`,
        },
        body: JSON.stringify(order),
      });
      return await res.json();
    },
  });
};

export default () => {
  const [allowToOrder, setAllowToOrder] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const methods = useForm();
  type Inputs = {};
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const t = useTranslations("new-order");
  const { mutateAsync, isPending } = useSubmitOrder();

  const ifLinkvalidate = async (link: string) => {
    try {
      const validate = await validateLink(link);
      if (validate) {
        setAllowToOrder(true);
        setCheckBox(true);
        toast.success("You link successfuly validated");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <section>
        <OwnerHeader isBack title={t("title")} />
        <main className="p-4">
          <section className="text-center">
            <p className="text-balance text-center text-muted-foreground text-xs/5">
              {t("description")}
            </p>
          </section>
          <hr className="my-4" />
          <OrderLink ifLinkvalidate={ifLinkvalidate} checkBox={checkBox} />
          <OrderDuration />
          <hr className="my-4" />
          <OrderRejoin />
          <hr className="my-4" />
          <OrderLanguage />
          <hr className="my-4" />
          <section className="grid gap-4">
            <h2 className="heading">
              Subscribers ‘re-join’ Delay settings (optional)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="other-lang" />
                <label
                  htmlFor="other-lang"
                  className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  No any limit
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other-lang" />
                <label
                  htmlFor="other-lang"
                  className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  One - week
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other-lang" />
                <label
                  htmlFor="other-lang"
                  className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  One-month
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other-lang" />
                <label
                  htmlFor="other-lang"
                  className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  three-month
                </label>
              </div>
            </div>
          </section>
          <hr className="my-4" />
          <OrderYear />
          <Button
            disabled={isPending || !allowToOrder}
            onClick={() => mutateAsync()}
            variant={"blue"}
            className="mt-4 w-full"
          >
            34$ Submit the Order
          </Button>
          <span className="text-muted-foreground text-xs">
            Your Balance: n$
          </span>
        </main>
      </section>
    </FormProvider>
  );
};
