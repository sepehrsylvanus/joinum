import { LoadingIcon } from "@/components/icons/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { getOwnerInfos } from "@/lib/apiRoutes";
import { use } from "react";
import Link from "next/link";

const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const res = await fetch("/api/v1/users/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BASE_TOKEN}`,
        },
      });
      const result = await res.json();
      return result.data;
    },
  });
};

export function UserSettings() {
  const t = useTranslations("owner-dashboard");
  // const { data, isLoading } = useGetUserInfo();
  const locale = useLocale();
  const { data, error } = use(getOwnerInfos());
  let isLoading = false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-8">
        <LoadingIcon className="fill-blue-500" />
      </div>
    );
  }

  return (
    <>
      <h2 className="heading py-4">{t("settings-tab-title")}</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <p className="heading flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground text-xs">
            {t("total-orders-title")}
          </p>
          <p className="heading flex items-center justify-center rounded-full bg-muted/60 p-2 text-foreground">
            {data.total_order}$
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="heading flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground text-xs">
            {t("total-orders-title")}
          </p>
          <p className="heading flex items-center justify-center rounded-full bg-muted/60 p-2 text-foreground">
            {data.total_spent}$
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="heading flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground text-xs">
            {t("active-orders-title")}
          </p>
          <p className="heading flex items-center justify-center rounded-full bg-muted/60 p-2 text-foreground">
            {data.active_orders}$
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="heading flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground text-xs">
            {t("completed-orders-title")}
          </p>
          <p className="heading flex items-center justify-center rounded-full bg-muted/60 p-2 text-foreground">
            {data.completed_orders}$
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="heading flex-1">{t("referral-title")} : </h2>
        <Button className="rounded-full">{t("share-link")}</Button>
        <Button className="rounded-full" variant={"secondary"}>
          {t("as-story")}
        </Button>
        <p className="mx-auto mt-2 text-muted-foreground text-xs/6">
          {t("referral-description")}
        </p>
      </div>
      <hr className="my-4" />
      <Button className="h-12 w-full rounded-xl">
        {t("total-earn")}: {data.total_earned_by_refferal}$
      </Button>
      <hr className="my-4" />
      <div className="grid gap-4">
        <h2 className="heading">{t("wallet-title")}</h2>
        <Input
          type="text"
          className="h-11 rounded-2xl border-none bg-muted"
          placeholder={t("wallet-placeholder")}
        />
        <p className="font-medium text-muted-foreground text-xs">
          {t("wallet-description")} $ 212.25
        </p>
        <Button className="h-12 w-full rounded-xl">{t("payment-btn")}</Button>
      </div>
      <hr className="my-4" />
      <Link href={`/${locale}/user`}>
        <Button className="h-12 w-full rounded-xl" variant={"secondary"}>
          {t("switch-user-btn")}
        </Button>
      </Link>
    </>
  );
}
