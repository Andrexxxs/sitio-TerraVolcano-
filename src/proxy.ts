import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";

// Spanish for visitors whose browser prefers Spanish, English for everyone else.
function preferredLocale(request: NextRequest): Locale {
  const first = request.headers.get("accept-language")?.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  if (!first) return defaultLocale;
  return first === "es" ? "es" : "en";
}

export function proxy(request: NextRequest) {
  const [, segment] = request.nextUrl.pathname.split("/");
  if (hasLocale(segment)) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and files with an extension (favicon, images…).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
