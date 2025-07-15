import type { PropsWithChildren } from "react";
import { UserHeader } from "./_components/header";

export default async function UserLayout({ children }: PropsWithChildren) {
  return (
    <section className="container min-h-dvh">
      <UserHeader />
      <main className="p-4">{children}</main>
    </section>
  );
}
