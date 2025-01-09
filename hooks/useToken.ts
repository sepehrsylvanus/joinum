import { getToken } from "@/server/actions/authActions";
import { useQuery } from "@tanstack/react-query";

export const useGetToken = () => {
  return useQuery({
    queryKey: ["getToken"],
    queryFn: async () => {
      const token = await getToken();
      return token;
    },
  });
};
