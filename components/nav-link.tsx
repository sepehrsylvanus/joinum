import { useLocale } from 'next-intl';
import Link, { type LinkProps } from 'next/link';

type Props = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export function NavLink(props: Props) {
  const locale = useLocale();
  return (
    <Link
      className={props.className}
      {...props}
      href={`/${locale}${props.href}`}
    >
      {props.children}
    </Link>
  );
}
