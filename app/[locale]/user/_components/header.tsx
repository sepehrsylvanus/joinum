import { NavLink } from '@/components/nav-link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link2Icon, MenuIcon } from 'lucide-react';
import { UserInfo } from './user-info';
import { HeaderButtonLink } from './header-button-link';

export function UserHeader() {
  return (
    <header className="border-b">
      <nav className="flex items-center justify-between gap-2 px-4 py-3">
        <HeaderButtonLink />
        <h3 className="flex-1 font-bold text-primary">Joinium</h3>
        <Button variant={'outline'} size={'icon'}>
          <Link2Icon className="size-4" />
        </Button>
        <UserInfo />
        <NavLink href={'/user/dashboard'}>
          <Avatar className="ring-2 ring-amber-500">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </NavLink>
      </nav>
    </header>
  );
}
