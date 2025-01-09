import { errorType } from "@/types/error";
import { AXIOS } from "@/utils/axiosInstance";
import { getToken } from "@/server/actions/authActions";

export async function getOrders() {
  const token = await getToken();
  try {
    const res = await AXIOS.get("/orders", {
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

export async function getUserInfos() {
  const token = await getToken();

  try {
    const res = await AXIOS.get("/users/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function updateWalletAddress(wallet_address: string): Promise<{
  data: walletUpdateAddress | null;
  error: errorType | null;
}> {
  const token = await getToken();
  try {
    const res = await AXIOS.post(
      "/users/updateWallet",
      {
        wallet_address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = res.data;

    return {
      data: result,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: {
        code: err.response?.data?.error?.code || 500,
        message: err.response?.data?.error?.message || "try again later",
      },
    };
  }
}

export async function inviteAsParentAccount(parent_user_id: number): Promise<{
  data: walletUpdateAddress | null;
  error: errorType | null;
}> {
  const token = await getToken();
  let res = null;
  try {
    res = await AXIOS.post(
      "/users/sendParentInvite",
      {
        parent_user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = res.data;

    return {
      data: result,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: {
        code: err.response?.data?.error?.code || 500,
        message: err.response?.data?.error?.message || "try again later",
      },
    };
  }
}

export async function getUserBalance(): Promise<{
  data: userBalance;
  error: errorType;
}> {
  try {
    const res = await AXIOS.get("/users/balance");
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
    const res = await AXIOS.post("/users/updateSettings", {
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
    const res = await AXIOS.get("/owners/info");
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
    const res = await AXIOS.get(`/orders/${orderType}`);
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
    const res = await AXIOS.post("/auth/login", {
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
    const res = await AXIOS.post("/users/createAddlist", {
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
