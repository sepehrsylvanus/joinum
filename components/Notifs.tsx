"use client";
import { acceptChildRequest, readNotif } from "@/actions/notifications";
import {
  useDeleteNotifs,
  useGetNotifications,
  useReadNotif,
} from "@/hooks/useNotifications";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const Notifs = () => {
  const { data: notifications, isLoading: notificationsLoading } =
    useGetNotifications();
  const { mutate: readNotif } = useReadNotif();
  const { mutate: deleteAllNotifs } = useDeleteNotifs();
  const readNotification = async (notifId: string) => {
    try {
      readNotif(notifId);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const accpetingChildRequest = async (child_user_id: number) => {
    try {
      const accpet = await acceptChildRequest(child_user_id);
      if (accpet) {
        toast.success("Child request accepted");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  if (notificationsLoading) return <div>Notifications loading...</div>;
  if (notifications && notifications.length > 0) {
    return (
      <div className="flex flex-col">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`flex flex-col mt-4 ${
              index !== notifications.length - 1
                ? "border-b-2 border-white pb-4"
                : ""
            } ${notification.unread ? "hidden" : ""}`}
          >
            <div className="w-full flex justify-between items-stretch">
              <div className="w-3/4 overflow-hidden">
                <div className="flex w-full gap-2">
                  <div className="flex flex-wrap">
                    <div className="w-full font-bold">
                      {notification.data.text}
                    </div>
                    <div className="w-full text-gray-500 line-clamp-1 text-[12px]">
                      {notification.data.child_user_id}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 flex gap-2 items-center justify-end ">
                {notification.unread && (
                  <Button
                    size="icon"
                    className="rounded-full aspect-square w-10 h-10 flex items-center justify-center"
                    onClick={() => readNotification(notification.id)}
                  >
                    <Check />
                  </Button>
                )}
                <div className="text-gray-400 text-[10px] text-center">
                  {notification.created_at}
                </div>
              </div>
            </div>
            {notification.data.child_user_id && (
              <Button
                className="mt-4"
                onClick={() =>
                  accpetingChildRequest(notification.data.child_user_id)
                }
              >
                Confirm Request
              </Button>
            )}
            {notification.data.addlist && (
              <Link
                href={notification.data.addlist}
                className="underline text-center text-blue-400 mt-4"
              >
                {notification.data.addlist}
              </Link>
            )}
          </div>
        ))}
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => deleteAllNotifs()}
        >
          I Read all notifications
        </Button>
      </div>
    );
  } else {
    return <p>There are no notifications</p>;
  }
};

export default Notifs;
