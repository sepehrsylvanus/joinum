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
  useWatch,
} from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { submitOrder, validateLink } from "@/actions/orders";
import { useGetBalance } from "@/hooks/useUser";
import { useGetSetting } from "@/hooks/useApp";
import { getSetting } from "@/actions";
import { link } from "fs";
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
  const { data: balance } = useGetBalance();
  const { data: settings } = useGetSetting();
  console.log({ settings });
  type OrderType = {
    link: string;
    languages: string[];
    sub_duration: string;
    rejoin_delay: string;
    normal_sub_price: number;
    premium_sub_price: number;
    quantity: number;
    type: "Normal" | "Premium" | "Both";
  };
  const methods = useForm<OrderType>({
    defaultValues: async () => {
      const setting = await getSetting();
      return {
        link: "",
        languages: [],
        sub_duration: "30",
        rejoin_delay: "0",
        normal_sub_price: setting.normal_sub_price,
        premium_sub_price: setting.premium_sub_price,
        quantity: 1,
        type: "Premium",
      };
    },
  });
  type Inputs = {};

  function calculateOrderPrice(
    quantity: number,
    subPrice: number,
    days: number
  ) {
    const basePricePerDay = subPrice / 1000 / 30;
    console.log({ quantity, subPrice, days });
    return Math.ceil(basePricePerDay * days * quantity * 100) / 100;
  }
  const control = methods.control;
  const quantity = useWatch({
    control,
    name: "quantity",
  });
  const premiumSubPrice = useWatch({
    control,
    name: "premium_sub_price",
  });
  const normalSubPrice = useWatch({
    control,
    name: "normal_sub_price",
  });
  const type = useWatch({
    control,
    name: "type",
  });
  const days = useWatch({
    control,
    name: "sub_duration",
  });
  const onSubmit = async (values: OrderType) => {
    const orderDetailsWithPremium = {
      link: values.link,
      quantity: values.quantity,
      options: {
        premium_sub_price: values.premium_sub_price,
        subscribers_type: values.type,
        sub_duration: Number(values.sub_duration),
        rejoin_delay: Number(values.rejoin_delay),
        languages: values.languages,
      },
    };
    const orderDetailsWithNormal = {
      link: values.link,
      quantity: values.quantity,
      options: {
        normal_sub_price: values.normal_sub_price,
        subscribers_type: values.type,
        sub_duration: Number(values.sub_duration),
        rejoin_delay: Number(values.rejoin_delay),
        languages: values.languages,
      },
    };
    const orderWithBoth = {
      link: values.link,
      quantity: values.quantity,
      options: {
        premium_sub_price: values.premium_sub_price,
        normal_sub_price: values.normal_sub_price,
        subscribers_type: values.type,
        sub_duration: Number(values.sub_duration),
        rejoin_delay: Number(values.rejoin_delay),
        languages: values.languages,
      },
    };
    try {
      if (values.type === "Premium") {
        const postOrder = await submitOrder(orderDetailsWithPremium);
        if (postOrder) {
          toast.success("Order submitted successfully");
        }
      } else if (values.type === "Normal") {
        const postOrder = await submitOrder(orderDetailsWithNormal);
        if (postOrder) {
          toast.success("Order submitted successfully");
        }
      } else if (values.type === "Both") {
        const postOrder = await submitOrder(orderWithBoth);
        if (postOrder) {
          toast.success("Order submitted successfully");
        }
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const t = useTranslations("new-order");

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
          <hr className="my-4" />
          <OrderPrice />
          <hr className="my-4" />
          <OrderDuration />
          <hr className="my-4" />
          <OrderRejoin />
          <hr className="my-4" />
          <OrderLanguage />
          <hr className="my-4" />

          {balance && (
            <>
              <Button
                // disabled={isPending || !allowToOrder}
                onClick={methods.handleSubmit(onSubmit)}
                variant={"blue"}
                className="mt-4 w-full"
              >
                {calculateOrderPrice(
                  quantity,
                  type === "Premium" ? premiumSubPrice : normalSubPrice,
                  Number(days)
                )}
                $ Submit the Order
              </Button>
              <span className="text-muted-foreground text-xs">
                Your Balance: {balance}$
              </span>
            </>
          )}
        </main>
      </section>
    </FormProvider>
  );
};
