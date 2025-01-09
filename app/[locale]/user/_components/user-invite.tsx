"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  inviteUserAsParentAction,
  updateWalletAddressAction,
} from "@/server/actions";
import { useState, useTransition } from "react";
import { toast, Toaster } from "sonner";

export function UserInvite() {
  const t = useTranslations("user-dashboard");
  const [isPending, startTransition] = useTransition();

  const [username, setUsername] = useState<string>("");
  function inviteUser() {
    startTransition(async () => {
      const result = await inviteUserAsParentAction(Number(username));
      console.log(result);
      if (result.data) {
        toast.success(t("toast-invite-successfully-updated"));
      } else {
        toast.error(result.error.message);
      }
    });
  }

  return (
    <section className="mb-4 space-y-4 border-b pb-4">
      <h3 className="heading text-xs">{t("send-invite-title")}</h3>
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex flex-1 items-center">
          <User2Icon className="absolute mx-3.5 size-5" />
          <Input
            type="text"
            className="h-11 rounded-2xl border-none bg-muted pl-12"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("username-placeholder")}
          />
        </div>
        <Button className="h-11 rounded-2xl px-6" onClick={inviteUser}>
          Invite
        </Button>
      </div>
    </section>
  );
}
