"use server";

import { cookies } from "next/headers";
type USERANDID = {
  username: string;
  user_id: number;
  name: string;
};
export const saveToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7),
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};

export const saveUserAndId = async (userDetails: {
  username: string;
  user_id: number;
  name: string;
}) => {
  const cookieStore = await cookies();
  cookieStore.set("userDetails", JSON.stringify(userDetails), {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7),
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getUserAndId = async () => {
  const cookieStore = await cookies();
  const userDetailsJSON = cookieStore.get("userDetails")?.value;
  return userDetailsJSON ? (JSON.parse(userDetailsJSON) as USERANDID) : null;
};
