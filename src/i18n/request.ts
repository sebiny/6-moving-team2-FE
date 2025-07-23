import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    // ...(await import(`../messages/${locale}/common.json`)).default,
    // ...(await import(`../messages/${locale}/Button.json`)).default,
    // ...(await import(`../messages/${locale}/Driver.json`)).default,
    ...(await import(`../messages/${locale}/Review.json`)).default
    // 필요시 계속 추가 가능
  };
  return {
    locale,
    messages
  };
});
