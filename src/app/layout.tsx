import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { ConfigProvider } from "antd";
import RegistyProvider from "@/components/utils/RegistyProvider";
import ReduxProviderClient from "@/components/utils/ReduxProviderClient";
import OpenSans from "./assets/fonts";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "H-tube",
  description: "Video của Huy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={OpenSans.className}>
        <NextTopLoader
          color="#EE0033"
          height={2}
          shadow="none"
          showSpinner={false}
          crawlSpeed={100}
        />
        <ReduxProviderClient>
          <AntdRegistry>
            <ConfigProvider>
              <RegistyProvider>{children}</RegistyProvider>
            </ConfigProvider>
          </AntdRegistry>
        </ReduxProviderClient>
      </body>
    </html>
  );
}
