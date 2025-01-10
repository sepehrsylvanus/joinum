import "@/assets/app.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter, Vazirmatn } from "next/font/google";
import type { PropsWithChildren } from "react";
import "swiper/swiper-bundle.css";

const vazir = Vazirmatn({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Joinium",
    template: "%s - Joinium",
  },
  description: "The Joinium Application",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="theme-color" href="#14B8A6" />
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body
        className={cn(
          locale === "fa" || locale === "ar" ? vazir.className : inter.className
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              enableColorScheme
              defaultTheme="light"
              disableTransitionOnChange
            >
              <div className="container">{children}</div>

              <ToastProvider />
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
