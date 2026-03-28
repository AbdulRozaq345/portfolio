import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

// 1. Definisikan routingnya dulu bosquu
export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "id",
  localePrefix: "as-needed",
});

// 2. Baru deh export fungsinya
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
