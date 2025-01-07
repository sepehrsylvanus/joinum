'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {ITelegramUser, IWebApp} from "@/types/telegram";

export interface ITelegramContext {
    webApp?: IWebApp;
    user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});



export const useTelegram = () => useContext(TelegramContext);