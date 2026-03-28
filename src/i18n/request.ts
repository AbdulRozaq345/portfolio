import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "id"] as const;
const defaultLocale = "id";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    // Keluar 2x: dari i18n -> src -> root (tempat folder messages berada)
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
