"use client"

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {CreditCard} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useState, useTransition} from "react";
import {updateWalletAddress, updateWalletAddressAction} from "@/server/actions";
import {toast, Toaster} from "sonner";

export function UserWallet({address}: { address: WalletAddress }) {

    const locale = useLocale();
    const t = useTranslations('user-dashboard');
    const [walletAddress, setWalletAddress] = useState<string>(address?.toString() || '');
    const [message, setMessage] = useState("");

    const [isPending, startTransition] = useTransition();


    function saveWalletAddress(e) {
        e.preventDefault();
        startTransition(async () => {
            const result = await updateWalletAddressAction(walletAddress);
            if (result) {
                toast.success(t("toast-wallet-successfully-updated"));
            } else {
                toast.success(t("toast-wallet-successfully-updated"));
            }
        });

    }

    return (
        <section className="mb-4 space-y-4 border-b pb-4">
            <h2 className="heading">{t('wallet-title')}</h2>
            <div className="flex items-center justify-between gap-2">

                <div className="relative flex flex-1 items-center">
                    <CreditCard className="absolute mx-3.5 size-5"/>
                    <Input
                        type="text"
                        className={cn(
                            'h-11 rounded-2xl border-none bg-muted',
                            locale === 'fa' || locale === 'ar' ? 'pr-12' : 'pl-12',
                        )}
                        placeholder={t('wallet-placeholder')}
                        value={walletAddress}
                        onInput={e => setWalletAddress(e.target.value)}
                    />
                </div>
                <Button onClick={saveWalletAddress} type={"submit"} className="h-11 rounded-2xl px-6">
                    {t('wallet-save-btn')}
                </Button>

            </div>
        </section>
    );
}
