import type { PropsWithChildren } from 'react';

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <section className="container min-h-dvh">
      <main>{children}</main>
    </section>
  );
}
