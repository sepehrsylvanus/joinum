"use server";

import { cookies } from "next/headers";

export const saveToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7),
    maxAge: 60 * 60 * 24 * 7,
  });
};
