import { getToken } from "@/server/actions/authActions";
import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "https://joinium.tgfen.com/api/v1",
});
AXIOS.interceptors.request.use(
  async (config) => {
    // Retrieve the token
    const token = await getToken();

    if (token) {
      // Set the token in the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);
