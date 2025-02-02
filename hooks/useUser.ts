import { getBalance, getUserInfo } from "@/actions/user";
import { getUserAndId } from "@/server/actions/authActions";
import { useQuery } from "@tanstack/react-query";

export const userGetUserInfo = () => {
  return useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const user = await getUserInfo();
      return user;
    },
  });
};

export const useGetUserAndId = () => {
  return useQuery({
    queryKey: ["getUserAndId"],
    queryFn: async () => {
      const userAndId = await getUserAndId();
      return userAndId;
    },
  });
};
export const useGetBalance = () => {
  return useQuery({
    queryKey: ["getBalance"],
    queryFn: async () => {
      const balance = await getBalance();
      return balance;
    },
  });
};
