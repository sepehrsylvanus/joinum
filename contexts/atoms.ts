import { atom } from "jotai";

type Order = {
  link: string;
  quantity: number;
  options: {
    premium_sub_price: number;
    normal_sub_price: number;
    sub_duration: string;
    rejoin_delay: string;
    accounts_year: "any" | "2015" | "2016" | "2017" | "2018" | "2019" | "2020";
    languages: string;
  };
};

export const orderAtom = atom<Order>({
  link: "",
  quantity: 100,
  options: {
    premium_sub_price: 7,
    normal_sub_price: 4,
    sub_duration: "1week",
    rejoin_delay: "1week",
    accounts_year: "any",
    languages: "",
  },
});
