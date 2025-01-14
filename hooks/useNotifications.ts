import {
  getNotifications,
  readAllNotifs,
  readNotif,
} from "@/actions/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
type Notifications = {
  id: string;
  type: string;
  data: {
    child_user_id: number;
    order_id: number;
    addlist: string;
    text: string;
  };
  created_at: string;
  unread: boolean;
}[];
export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["getNotifications"],
    queryFn: async () => {
      const notifs = await getNotifications();
      return notifs as Notifications;
    },
  });
};
export const useReadNotif = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notifId: string) => {
      await readNotif(notifId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotifications"],
      });
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
};
export const useDeleteNotifs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await readAllNotifs();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotifications"],
      });
      toast.error("All notifications deleted");
    },
  });
};
