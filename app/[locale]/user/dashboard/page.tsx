import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { UserDetails } from "../_components/user-details";
import { UserInvite } from "../_components/user-invite";
import { UserReferral } from "../_components/user-referral";
import { UserStatus } from "../_components/user-status";
import { UserUpload } from "../_components/user-upload";
import { UserWallet } from "../_components/user-wallet";
import UserSettings from "@/components/ui/UserSettings";
import { getUserInfos } from "@/lib/apiRoutes";
import Link from "next/link";

export default async () => {
  const user = await getUserInfos();
  console.log({ user });
  return (
    <>
      <Dashoard userInfo={user.data} />
    </>
  );
};

function Dashoard({ userInfo }: { userInfo: userInfo }) {
  const t = useTranslations("user-dashboard");
  const locale = useLocale();

  return (
    <>
      <UserDetails />
      <UserStatus status={userInfo?.account_type} />
      <UserWallet address={userInfo?.wallet_address} />
      <UserInvite />
      <UserReferral />
      <UserUpload />
      <hr className="my-4" />
      <UserSettings settings={userInfo?.settings} />
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <Button className="rounded-full" size={"sm"} variant={"secondary"}>
          {t("total-child-accounts-title")}: {userInfo?.total_child_accounts}
        </Button>
        <Button className="rounded-full" size={"sm"} variant={"secondary"}>
          {t("total-joined-all-time-title")}: {userInfo?.total_joined}
        </Button>
        <Button className="rounded-full" size={"sm"} variant={"secondary"}>
          {t("total-earned-all-time-title")}: {userInfo?.total_earned}
        </Button>
        <Button className="rounded-full" size={"sm"} variant={"secondary"}>
          {t("total-earn-by-referrals-title")}:{" "}
          {userInfo?.total_earned_by_refferal}$
        </Button>
      </div>
      <hr className="my-4" />
      <div className="grid gap-4">
        <div className="flex w-full items-center justify-between rounded-full bg-muted p-2">
          <p className="heading px-2">
            {t("current-joinium-commission-title")}:{" "}
            {userInfo?.current_commission}%
          </p>
          <Button
            size={"icon"}
            className="size-8 rounded-full pointer-events-none cursor-default"
          >
            <InfoIcon className="size-5" />
          </Button>
        </div>
        <div className="rounded-3xl bg-muted p-4">
          <p className="text-sm/6">
            {t("current-joinium-commission-description")}
          </p>
        </div>
        <div className="rounded-3xl bg-muted p-4">
          <p className="text-sm/6">
            {t("current-joinium-commission-description2")}
          </p>
        </div>
      </div>
      <Link href={`/${locale}/owner`}>
        <Button className="mt-6 w-full rounded-xl">
          {t("switch-owner-btn")}
        </Button>
      </Link>
    </>
  );
}
