import { getSetting } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetSetting = () => {
  return useQuery({
    queryKey: ["getSetting"],
    queryFn: async () => {
      const setting = await getSetting();
      return setting;
    },
  });
};
