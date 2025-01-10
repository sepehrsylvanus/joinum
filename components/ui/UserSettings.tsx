"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useTransition,
  useRef,
} from "react";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import debounce from "just-debounce-it";
import {
  inviteUserAsParentAction,
  updateSettingsAction,
} from "@/server/actions";

import { toast } from "sonner";

type SettingProps = {
  settings: {
    send_notification: boolean;
    show_nsfw: boolean;
  };
};

export default function UserSettings({ settings }: SettingProps) {
  const t = useTranslations("user-dashboard");
  const [notification, setNotification] = useState<boolean | undefined>(
    settings.send_notification
  );
  const [nsfwTitle, setNSFWTitle] = useState<boolean | undefined>(
    settings.show_nsfw
  );

  const [isPending, startTransition] = useTransition();
  const isInitialRender = useRef(true);

  const submitUpdateSettings = useCallback(
    debounce(() => {
      startTransition(async () => {
        const result = await updateSettingsAction({
          send_notification: Boolean(notification),
          show_nsfw: Boolean(nsfwTitle),
        });
        if (result) {
          toast.success(t("toast-settings-successfully-updated"));
        } else {
          toast.error(result.error.message);
        }
      });
    }, 500),
    [notification, nsfwTitle]
  );

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    submitUpdateSettings();
  }, [notification, nsfwTitle]);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="heading">{t("leave-notification-title")}</h2>
        <Switch
          onCheckedChange={(checked) => {
            setNotification(checked);
          }}
          checked={notification}
        />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="heading">{t("nsfw-title")}</h2>
        <Switch
          onCheckedChange={(checked) => {
            setNSFWTitle(checked);
          }}
          checked={nsfwTitle}
        />
      </div>
    </div>
  );
}
