"use server";
import {
  inviteAsParentAccount,
  postBoomarkList,
  postLogin,
  updateSettings,
  updateWalletAddress,
} from "@/lib/apiRoutes";
import { AXIOS } from "@/utils/axiosInstance";
import { getToken } from "./authActions";

export async function changePassword(password: string) {
  // run ro server
}

export async function updateWalletAddressAction(walletAddress: string) {
  const updatedWallet = await updateWalletAddress(walletAddress);
  return updatedWallet;
}

export async function inviteUserAsParentAction(username: number) {
  const inviteRequest = await inviteAsParentAccount(username);
  console.log({ inviteRequest });
  return inviteRequest;
}

export async function updateSettingsAction(settings: settings) {
  const updatedSetting = await updateSettings(settings);
  return updatedSetting;
}

export async function loginAction(initData: string) {
  const data = await postLogin(initData);
  console.log("loginAction data", data);
  return data;
}

export async function saveBoomarkListAction(orders: number[] = []) {
  const { data, error } = await postBoomarkList(orders);
  console.log("saveBoomarkListAction data", data);
  return error.code == null;
}

export const getUserStats = async () => {
  try {
    const token = await getToken();
    const res = await AXIOS.get("/users/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
