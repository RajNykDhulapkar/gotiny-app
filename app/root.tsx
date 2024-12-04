import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { themeSessionResolver } from "./sessions.server";
import Navbar from "~/components/Navbar";

import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import clsx from "clsx";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
        />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <a
          target="_blank"
          className="github-fork-ribbon"
          href="https://github.com/RajNykDhulapkar/gotiny"
          data-ribbon="Fork me on GitHub"
          title="Fork me on GitHub"
          rel="noreferrer"
        >
          Fork me on GitHub
        </a>
        <Navbar />

        <div className="min-h-screen relative overflow-y-hidden flex flex-col gap-[8rem] pt-[16rem] items-center justify-start bg-radial-gradient-custom  text-foreground p-4">
          <img
            className="z-[0] absolute w-full h-screen top-0 left-0 opacity-100 dark:opacity-70"
            src="/swirl.svg"
            alt="swirl"
          />

          <img
            className=" z-[1] absolute w-full h-auto top-0 left-0 opacity-5 dark:opacity-20"
            src="/cubes.svg"
            alt="cubes"
          />
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
