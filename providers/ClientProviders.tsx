"use client";
import { store } from "@/app/store";
import { FC } from "react";
import { Provider } from "react-redux";

interface ClientProvidersProps {
  children: React.ReactNode;
}

const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProviders;
