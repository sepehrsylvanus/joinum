"use server";

import { AXIOS } from "@/utils/axiosInstance";

export const getNotifications = async () => {
  const res = await AXIOS.get("/users/notifications");
  return res.data.data;
};

export const readNotif = async (notification_id: string) => {
  try {
    const res = await AXIOS.post("/users/readNotification", {
      notification_id,
    });
    if (res.data.success) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    throw new Error(errorMessage);
  }
};

export const acceptChildRequest = async (child_user_id: number) => {
  try {
    const res = await AXIOS.post("/users/acceptChildRequest", {
      child_user_id,
    });
    if (res.data.success) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
export const readAllNotifs = async () => {
  try {
    const res = await AXIOS.get("/users/clearNotifications");
    if (res.data.success) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;
    throw new Error(errorMessage);
  }
};
export const rejectChildRequest = async (child_user_id: number) => {
  try {
    const res = await AXIOS.post("/users/rejectChildRequest", {
      child_user_id,
    });
    if (res.data.success) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;
    throw new Error(errorMessage);
  }
};
