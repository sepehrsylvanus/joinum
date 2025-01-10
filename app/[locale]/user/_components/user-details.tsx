import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserBalance } from "@/lib/apiRoutes";
import { getUserAndId } from "@/server/actions/authActions";
import { useSelector } from "react-redux";

const UserBalance = async () => {
  // const [loading, setLoading] = useState(true);
  // const [balance, setBalance] = useState(0);
  // const getBalance = async () => {
  //   const res = await fetch('/api/v1/users/balance', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${process.env.BASE_TOKEN}`,
  //     },
  //   });
  //   const result = await res.json();
  //   setLoading(false);
  //   setBalance(result.data?.balance);
  // };
  //
  // useEffect(() => {
  //   getBalance();
  // }, []);

  const { data: userBalance, error } = await getUserBalance();

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/40 p-4">
      {/*<Skeleton className="h-5 w-full rounded-md" />*/}

      <p className="text-muted-foreground text-xs">
        Balance:
        <span className="pl-4 font-medium text-foreground text-sm">
          ${userBalance.balance}
        </span>
      </p>

      <Button className="rounded-full px-6 text-xs" size={"sm"}>
        withraw
      </Button>
    </div>
  );
};

export const UserDetails = async () => {
  const userDetails = await getUserAndId();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 flex-col items-center gap-4">
        <Avatar className="size-14 ring-2 ring-amber-500">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="space-y-1">
          <p className="font-semibold text-xs">@{userDetails?.username}</p>
          <p className="text-muted-foreground text-xs">
            {userDetails?.user_id}
          </p>
        </div>
      </div>
      <UserBalance />
    </div>
  );
};
