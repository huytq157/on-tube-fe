import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";
import { ConfigProvider } from "antd";
import RegistyProvider from "@/components/utils/RegistyProvider";
import ReduxProviderClient from "@/components/utils/ReduxProviderClient";
import Roboto from "./assets/fonts";
import { Suspense } from "react";
import { UserProvider } from "@/hook/AuthContext";
import LoadingPage from "./loading";
import { SocketProvider } from "@/hook/SocketContext";

export const metadata: Metadata = {
  title: "On-tube",
  description: "Chào mừng đến với channel của Huy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <title>On-tube</title>
      <meta name="description" content="Chào mừng đến với channel của Huy" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:url" content="https://on-tube.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="On-tube" />
      <meta
        property="og:description"
        content="Chào mừng đến với channel của Huy"
      />
      <meta property="og:image" content="" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="on-tube.vercel.app" />
      <meta property="twitter:url" content="https://on-tube.vercel.app/" />
      <meta name="twitter:title" content="On-tube" />
      <meta
        name="twitter:description"
        content="Chào mừng đến với channel của Huy"
      />
      <meta name="twitter:image" content="" />

      <body className={Roboto.className}>
        <NextTopLoader
          color="#EE0033"
          height={2}
          shadow="none"
          showSpinner={false}
          crawlSpeed={100}
        />

        <ReduxProviderClient>
          <UserProvider>
            <SocketProvider>
              <AntdRegistry>
                <ConfigProvider>
                  <RegistyProvider>
                    <Suspense fallback={<LoadingPage />}>{children}</Suspense>
                  </RegistyProvider>
                </ConfigProvider>
              </AntdRegistry>
            </SocketProvider>
          </UserProvider>
        </ReduxProviderClient>
      </body>
    </html>
  );
}
