'use client';
import { LoadingIcon } from '@/components/icons/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { FilePlus, FilesIcon, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {getOrders, getOwnerOrders} from "@/lib/apiRoutes";

const useGetOrders = (orderType: string) => {
  return useQuery<Order[], Error>({
    queryKey: ['orders', orderType],
    queryFn: async () => {
      const res = await fetch(`/api/v1/orders/${orderType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BASE_TOKEN}`,
        },
      });
      const result = await res.json();
      return result.data;
    },
  })
};

type Props = {
  orderType: 'myCompletedOrders' | 'myOrders' | '';
};

const Orders = async({ orderType }: {orderType:ownerOrderType}) => {
  const t = useTranslations('owner-dashboard');
  const { data: orders, error } = await getOwnerOrders(orderType);

  // if (!orders || isLoading) {
  //   return (
  //     <div className="flex items-center justify-center pt-8">
  //       <LoadingIcon className="fill-blue-500" />
  //     </div>
  //   );
  // }

  if (!orders.length) {
    return (
      <div className="flex items-center justify-center pt-8">
        <p className="text-muted-foreground text-sm">No Orders</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order:Order, i:number) => (
        <div
          key={order.link}
          className="grid gap-2 rounded-2xl bg-muted/60 px-4 pt-2 pb-4"
        >
          <nav className="flex items-center justify-between gap-4">
            <h2 className="heading text-justify">Order {i + 1}</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'ghost'} size={'icon'}>
                  <RefreshCcw className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link Attachment</DialogTitle>
                </DialogHeader>
                <Textarea placeholder="Add your link or links, one line one link" />
                <Button>Submit Order</Button>
              </DialogContent>
            </Dialog>
          </nav>
          <div className="space-y-1 divide-y">
            <p className="flex items-center justify-between gap-2 text-xs/6 *:font-medium">
              {t('order-link-title')}: <span>{order.link}</span>
            </p>
            <p className="flex items-center justify-between gap-2 text-xs/6 *:font-medium">
              {t('order-amount-title')}: <span>${order.amount}</span>
            </p>
            <p className="flex items-center justify-between gap-2 text-xs/6 *:font-medium">
              {t('order-remains-title')}: <span>{order.remains}</span>
            </p>
            <p className="flex items-center justify-between gap-2 text-xs/6 *:font-medium">
              {t('order-subscriber-title')}: <span>{order.subscribers_type}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};


