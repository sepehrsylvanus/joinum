"use server";

import { AXIOS } from "@/utils/axiosInstance";

interface SETTING {
  normal_sub_price: number;
  premium_sub_price: number;
}
export const getSetting = async () => {
  const res = await AXIOS.get("/settings");
  const setting = res.data.data as SETTING;
  return setting;
};
