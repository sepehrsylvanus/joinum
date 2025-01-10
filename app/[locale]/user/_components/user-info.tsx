import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { InfoIcon, User2 } from "lucide-react";
import { getCacheUserInfos } from "@/lib/cacheData";
import { capitalizeWords } from "@/lib/utils";
import { getUserInfos } from "@/lib/apiRoutes";
import { getUserStats } from "@/server/actions";

export async function UserInfo() {
  const userStats = await getUserStats();
  console.log(userStats);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <InfoIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="p-0 pt-6 pb-2">
          <DrawerTitle className="flex items-center text-left">
            <User2 className="mr-2 size-5" />
            User Information
          </DrawerTitle>
        </DrawerHeader>
        <ul className="list-disc p-4 text-foreground/80 text-xs [&>li]:leading-8">
          <li>
            Your Account is:{" "}
            <span className="font-semibold text-foreground">
              {userStats.account_type}
            </span>
          </li>
          <li>
            you are earning from{" "}
            <span className="font-semibold text-foreground">
              $ {userStats.active_orders}
            </span>{" "}
            active joined
          </li>
          <li>
            Your account free space:{" "}
            <span className="font-semibold text-foreground">
              {userStats.account_free_space}
            </span>
          </li>

          <li>
            Random generate addlists:{" "}
            <span className="font-semibold text-foreground">
              {userStats.generated_addlists}
            </span>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
