"use client";

import { AXIOS } from "@/utils/axiosInstance";

export const validateLink = async (link: string) => {
  try {
    const res = await AXIOS.post("/orders/checkLink", {
      link,
    });
    if (res.data.success) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;
    throw new Error(errorMessage);
  }
};
export const submitOrder = async () => {};
