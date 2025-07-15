import { getOrders } from "@/lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["getOrders"],
    queryFn: async () => {
      const { data: orders, error } = await getOrders();
      return orders;
    },
  });
};
