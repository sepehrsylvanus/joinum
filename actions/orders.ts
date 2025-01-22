"use client";

import { AXIOS } from "@/utils/axiosInstance";
type ORDER = {
  link: string; // Only Telegram username or invite link
  quantity: number;
  options: {
    premium_sub_price?: number;
    normal_sub_price?: number;
    subscribers_type: "Normal" | "Premium" | "Both"; // Can be 'Normal', 'Premium', or 'Both'
    sub_duration: number; // Can be 'renew_monthly', 10, 20, 30, or 90
    rejoin_delay: number; // Can be 0, 7, 30, or 90
    languages: string[]; // Array of language codes
  };
};
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

export const submitOrder = async (orderDetails: ORDER) => {
  console.log({ orderDetails });
  try {
    const res = await AXIOS.post("/orders/submitOrder", orderDetails);
    if (res.data.success) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;
    throw new Error(errorMessage);
  }
};
