import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";
import { nanoid } from "~/lib/utils";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "s3cr3t"],
    // Set domain and secure only if in production
    ...(isProduction ? { domain: "gotiny.fun", secure: true } : {}),
  },
});

const guestStorage = createCookieSessionStorage({
  cookie: {
    name: "_gotiny_guest",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "s3cr3t"],
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years in seconds
    ...(isProduction ? { domain: "gotiny.fun", secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);

export async function getGuestId(request: Request) {
  const session = await guestStorage.getSession(request.headers.get("Cookie"));
  let guestId = session.get("guestId");

  if (!guestId) {
    guestId = `guest_${nanoid()}`;
    session.set("guestId", guestId);
  }

  return {
    guestId,
    session,
    commitSession: () => guestStorage.commitSession(session),
  };
}
