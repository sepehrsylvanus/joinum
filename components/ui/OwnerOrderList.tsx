import {useTranslations} from "next-intl";
import {FilePlus, FilesIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import OwnerOrder from "@/components/ui/OwnerOrder";

export default async function  OwnerOrderList({ orders }: {orders:ownerOrder[]}) {

    const t = useTranslations('owner-dashboard');
    return (
        <section className="space-y-4 py-4">
            <nav className="flex items-center justify-between gap-4">
                <h2 className="heading flex items-center gap-2">
                    <FilesIcon className="size-4" />
                    {t('order-list-title')}
                </h2>
                <Button variant={'outline'} className="gap-2 rounded-full">
                    <FilePlus className="size-4" />
                    {t('order-title')}
                </Button>
            </nav>
            <OwnerOrder orders={orders} />
        </section>
    );
}

