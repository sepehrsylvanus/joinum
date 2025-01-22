"use server";

import { AXIOS } from "@/utils/axiosInstance";
type USERINFO = {
  account_type: string;
  total_child_accounts: number;
  total_joined: number;
  total_earned: number;
  total_earned_by_refferal: number;
  wallet_address: string;
  current_commission: number;
  settings: {
    show_nsfw: boolean;
    send_notification: boolean;
  };
};
export const getUserInfo = async () => {
  const res = await AXIOS.get("/users/info");
  const user = res.data.data as USERINFO;

  return user;
};
export const getBalance = async () => {
  const res = await AXIOS.get("/users/balance");
  const balance = res.data.data.balance;
  return balance;
};
