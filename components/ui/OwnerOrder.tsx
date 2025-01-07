import {useTranslations} from "next-intl";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {RefreshCcw} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

export default async function OwnerOrder({orders}:{orders:ownerOrder[] }) {
    const t = useTranslations('owner-dashboard');

    // if (!orders || isLoading) {
    //   return (
    //     <div className="flex items-center justify-center pt-8">
    //       <LoadingIcon className="fill-blue-500" />
    //     </div>
    //   );
    // }

    if (!orders?.length) {
        return (
            <div className="flex items-center justify-center pt-8">
                <p className="text-muted-foreground text-sm">No Orders</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {orders?.map((order: ownerOrder, i: number) => (
                <div
                    key={order.link}
                    className="grid gap-2 rounded-2xl bg-muted/60 px-4 pt-2 pb-4"
                >
                    <nav className="flex items-center justify-between gap-4">
                        <h2 className="heading text-justify">Order {i + 1}</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'ghost'} size={'icon'}>
                                    <RefreshCcw className="size-4"/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Link Attachment</DialogTitle>
                                </DialogHeader>
                                <Textarea placeholder="Add your link or links, one line one link"/>
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


}
