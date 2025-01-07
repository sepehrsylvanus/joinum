'use client'

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {IWebApp} from "@/types/telegram";
import {TelegramContext, useTelegram} from "@/hooks/telegramProvider";

export default function Home() {


        const [webApp, setWebApp] = useState<IWebApp | null>(null);
        useEffect(() => {
            const app = (window as any).Telegram?.WebApp;
            if (app) {
                app.ready();
                app.expand();
                setWebApp(app);
            }
        }, []);


    const value = useMemo(() => {
        return webApp
            ? {
                webApp,
                unsafeData: webApp.initDataUnsafe,
                user: webApp.initDataUnsafe.user,
            }
            : {};
    }, [webApp]);
    console.log(value?.webApp?.initData?.toString())
    console.log(value?.user)

    return (
        <div>
           <p>
               {
                   value && value?.webApp?.initData?.toString()
               }
           </p>
        </div>
    );
}