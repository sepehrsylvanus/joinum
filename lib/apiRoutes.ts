import apiClient from "@/lib/axiosInstance";
import { errorType } from "@/types/error";
import { UserInfo } from "@/app/[locale]/user/_components/user-info";
import { UserStatus } from "@/app/[locale]/user/_components/user-status";
import { AXIOS } from "@/utils/axiosInstance";
import { getToken } from "@/server/actions/authActions";

export async function getOrders() {
  const token = await getToken();
  try {
    const res = await AXIOS.get("/api/v1/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data, error } = res.data;

    return {
      data: data || [],
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: [],
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function getUserInfos(): Promise<{
  data: userInfo;
  error: errorType;
}> {
  try {
    const res = await apiClient.get("/api/v1/users/info");
    const { status, data, error } = res.data;

    return {
      data: {
        ...data,
        account_type: data.account_type.toString().toLowerCase(),
      },
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: {
        account_type: "normal",
        total_child_accounts: 0,
        total_joined: 0,
        total_earned: 0,
        total_earned_by_refferal: 0,
        wallet_address: null,
        current_commission: 0,
      },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function updateWalletAddress(walletAddress: string): Promise<{
  data: walletUpdateAddress;
  error: errorType;
}> {
  try {
    const res = await apiClient.post("/api/v1/users/updateWallet", {
      wallet_address: walletAddress,
    });
    const { status, data, error } = res.data;

    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: { message: "" },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function inviteAsParentAccount(username: string): Promise<{
  data: walletUpdateAddress;
  error: errorType;
}> {
  let res = null;
  try {
    res = await apiClient.post("/api/v1/users/sendParentInvite", {
      parent_user_id: 5536316184,
    });

    const { status, data, error } = res.data;

    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: { message: "" },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function getUserBalance(): Promise<{
  data: userBalance;
  error: errorType;
}> {
  try {
    const res = await apiClient.get("/api/v1/users/balance");
    const { status, data, error } = res.data;

    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: {
        balance: 0,
        "Available Balance": 0,
      },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function updateSettings(
  settings: settings
): Promise<{ data: settings; error: errorType }> {
  try {
    const res = await apiClient.post("/api/v1/users/updateSettings", {
      send_notification: settings.send_notification,
      show_nsfw: settings.show_nsfw,
    });
    const { status, data, error } = res.data;

    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: {
        send_notification: false,
        show_nsfw: false,
      },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function getOwnerInfos(): Promise<{
  data: ownerInfos;
  error: errorType;
}> {
  try {
    const res = await apiClient.get("/api/v1/owners/info");
    const { status, data, error } = res.data;
    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: {
        total_order: 0,
        total_spent: 0,
        active_orders: false,
        completed_orders: false,
        total_earned_by_refferal: 0,
        wallet_address: "",
      },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function getOwnerOrders(
  orderType: ownerOrderType
): Promise<{ data: ownerOrder[]; error: errorType }> {
  try {
    const res = await apiClient.get(`/api/v1/orders/${orderType}`);
    const { status, data, error } = res.data;

    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    return {
      data: [],
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}

export async function postLogin(
  initData: string
): Promise<{ data: userLogin; error: errorType }> {
  try {
    const res = await apiClient.post("/api/v1/auth/login", {
      initData: initData,
    });

    return res.data;
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function postBoomarkList(
  orders: number[] = []
): Promise<{ data: { message: string }; error: errorType }> {
  try {
    const res = await apiClient.post("/api/v1/users/createAddlist", {
      order_ids: orders,
    });
    console.log("res", res);

    const { data, error } = res.data;
    console.log("data", data);

    return {
      data: data,
      error: {
        code: error?.code || null,
        message: error?.message || "",
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      data: { message: "" },
      error: {
        code: 500,
        message: "try again later",
      },
    };
  }
}
