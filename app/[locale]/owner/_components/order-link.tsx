import { TelegramIcon } from "@/components/icons/telegram";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrderValue, useSetOrder } from "@/hooks/use-order";
import { useMutation } from "@tanstack/react-query";
import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { InfoModal } from "./info-modal";
import { useFormContext } from "react-hook-form";
import { getUserInfo } from "@/actions/user";
import { useGetUserAndId, userGetUserInfo } from "@/hooks/useUser";

const useCheckChannel = () => {
  return useMutation({
    mutationKey: ["check-channel"],
    mutationFn: async (link: string) => {
      const res = await fetch("/api/v1/orders/checkLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BASE_TOKEN}`,
        },
        body: JSON.stringify({ link }),
      });
      const result = await res.json();
      return result.data;
    },
  });
};
type OrderLinkProps = {
  ifLinkvalidate: (link: string) => Promise<void>;
  checkBox: boolean;
};
export const OrderLink: FC<OrderLinkProps> = ({ ifLinkvalidate, checkBox }) => {
  const link = useOrderValue().link;
  const setOrder = useSetOrder();

  const t = useTranslations("new-order");
  const { mutateAsync, isPending } = useCheckChannel();
  const { data: userInfo, isLoading: userInfoLoading } = userGetUserInfo();
  const { data: userAndId, isLoading: userAndIdLoading } = useGetUserAndId();
  console.log({ userInfo, userAndId });
  if (!userInfoLoading && !userAndIdLoading) {
    if (userInfo && userAndId) {
      return (
        <section className="grid gap-4">
          <h2 className="heading">
            1. {t("step-one-title")}
            <InfoModal
              body={
                <ul className="list-decimal space-y-2 p-4">
                  <li className="text-xs/5">
                    We don't ban porn or illegal content on our platform, but we
                    label it as NSFW and show it only to users who have enabled
                    NSFW content in their profiles.
                  </li>
                  <li className="text-xs/5">
                    We detect NSFW or +18 content through channel names and
                    posts Cheating the platform results in a deletion of bid.
                  </li>
                </ul>
              }
            />
          </h2>
          <div className="flex items-center gap-2">
            <Input
              className="flex-1 bg-muted/50"
              placeholder={t("check-placeholder")}
              value={link}
              onChange={(e) =>
                setOrder((prev) => ({ ...prev, link: e.target.value }))
              }
            />
            <Button
              disabled={isPending}
              type="button"
              onClick={() => ifLinkvalidate(link)}
            >
              {t("check-btn")}
            </Button>
          </div>
          {checkBox && (
            <>
              <span className="text-right font-semibold text-muted-foreground text-xs">
                NSFW: {userInfo.settings.show_nsfw ? "YES" : "NO"}
              </span>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <TelegramIcon className="size-5 text-blue-500" />
                  Name: {userAndId.name}
                </div>
                <div className="flex items-center gap-2 font-medium text-sm">
                  <LinkIcon className="size-5 text-blue-500" />
                  Link: t.me/{userAndId.username}
                </div>
              </div>
            </>
          )}
        </section>
      );
    } else {
      throw new Error("Necessary informations didn't found");
    }
  }
};
