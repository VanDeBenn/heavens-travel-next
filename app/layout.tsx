import "./globals.css";
import "antd/dist/reset.css";
import { Provider } from "./provider";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";

export const metadata = {
  title: "Heavens Travel",
  icons: {
    icon: "/image/icon/logo-circle.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* ugh */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Script src="/api/env" strategy={"beforeInteractive"}></Script>
        <CookiesProvider>
          {/* Wrap your app in CookiesProvider */}
          <Provider>{children}</Provider>
        </CookiesProvider>
      </body>
    </html>
  );
}
