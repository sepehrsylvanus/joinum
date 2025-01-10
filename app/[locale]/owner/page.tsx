import { NavLink } from "@/components/nav-link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BadgePlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { OwnerHeader } from "./_components/header";
import { UserSettings } from "./_components/user-settings";
import Server from "@/components/test/Server";
import OwnerOrderList from "@/components/ui/OwnerOrderList";
import { getOwnerInfos, getOwnerOrders } from "@/lib/apiRoutes";

export default async () => {
  const { data: activeOrders, error: activeErrorOrder } = await getOwnerOrders(
    "myOrders"
  );
  const { data: completedOrders, error: completedErrorOrder } =
    await getOwnerOrders("myCompletedOrders");
  console.log({ completedOrders });
  return (
    <>
      <OwnerPage
        activeOrders={activeOrders}
        completedOrders={completedOrders}
      />
    </>
  );
};

function OwnerPage({
  activeOrders = [],
  completedOrders = [],
}: {
  activeOrders?: ownerOrder[];
  completedOrders?: ownerOrder[];
}) {
  const locale = useLocale();
  const t = useTranslations("owner-dashboard");
  return (
    <section>
      <OwnerHeader isBack={false} title={t("title")} />
      <main className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Avatar className="size-14 ring-2 ring-amber-500">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="space-y-1">
              <p className="font-semibold text-xs">@soheilghanbary</p>
              <p className="text-muted-foreground text-xs">13800707</p>
            </div>
          </div>
          <Button
            asChild
            variant={"secondary"}
            className={cn(
              "gap-2 rounded-full",
              locale === "en" ? "ml-auto" : "mr-auto"
            )}
          >
            <NavLink href={"/owner/new-order"}>
              <BadgePlus className="size-4" />
              {t("orderbtn")}
            </NavLink>
          </Button>
        </div>
        <hr className="my-2" />
        <Tabs dir={locale === "en" ? "ltr" : "rtl"} defaultValue="active">
          <TabsList className="grid grid-cols-3 gap-4">
            <TabsTrigger value="active">{t("tab-active")}</TabsTrigger>
            <TabsTrigger value="completed">{t("tab-completed")}</TabsTrigger>
            <TabsTrigger value="settings">{t("tab-settings")}</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p>Active Orders</p>
            <OwnerOrderList orders={activeOrders} />
          </TabsContent>
          <TabsContent value="completed">
            <p>Completed Orders</p>
            <OwnerOrderList orders={completedOrders} />
          </TabsContent>
          <TabsContent value="settings">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
}
