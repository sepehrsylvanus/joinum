import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookmarkIcon,
  CircleDollarSign,
  InfoIcon,
  User2,
  UserCircle,
} from "lucide-react";
import { getOrders } from "@/lib/apiRoutes";
import { toast } from "sonner";
import Client from "@/components/test/client";
import Link from "next/link";
import PaymentItem from "@/app/[locale]/user/_components/PaymentItem";
import PaymentList from "@/app/[locale]/user/_components/PaymentList";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import ProjectCard from "@/app/[locale]/user/_components/ProjectCard";

const InformantionModal = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant={"ghost"} size={"icon"}>
        <InfoIcon className="size-4" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex items-center text-left">
          <User2 className="mr-2 size-5" />
          User Information
        </SheetTitle>
      </SheetHeader>
      <ul className="list-disc p-4 text-foreground/80 text-xs [&>li]:leading-8">
        <li>
          Your Account is:{" "}
          <span className="font-semibold text-foreground">Normal</span>
        </li>
        <li>
          you are earning from{" "}
          <span className="font-semibold text-foreground">$n</span> active
          joined
        </li>
        <li>
          Your account free space:{" "}
          <span className="font-semibold text-foreground">n</span>
        </li>
        <li>
          Bookmarked: <span className="font-semibold text-foreground">n</span>
        </li>
        <li>
          Random generate addlists:
          <span className="font-semibold text-foreground">n</span>
        </li>
      </ul>
    </SheetContent>
  </Sheet>
);

export default async () => {
  const { data: orders = [], error } = await getOrders();
  console.log({ orders });
  return (
    <div>
      <BookmarkProvider>
        <ProjectCard />
        <hr className="my-4" />
        <PaymentList orders={orders} />
      </BookmarkProvider>
    </div>
  );
};
