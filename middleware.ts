import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/myapp", "/(fa|en|ar|ch|in)/:path*"],
};
