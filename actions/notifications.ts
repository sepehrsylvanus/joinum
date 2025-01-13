"use server";

import { AXIOS } from "@/utils/axiosInstance";

export const getNotifications = async () => {
  const res = await AXIOS.get("/users/notifications");
  return res.data.data;
};
