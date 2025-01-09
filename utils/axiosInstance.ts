import { getToken } from "@/server/actions/authActions";
import axios from "axios";

const fetchtoken = async () => {
  const token = await getToken();
  console.log(token);
  return token;
};
export const AXIOS = axios.create({
  baseURL: "https://joinium.tgfen.com/api/v1",
});
