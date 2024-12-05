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
// import LoadingPage from "./loading";

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
            <AntdRegistry>
              <ConfigProvider>
                <RegistyProvider>
                  {/* <Suspense fallback={<LoadingPage />}> */}
                  {children}
                  {/* </Suspense> */}
                </RegistyProvider>
              </ConfigProvider>
            </AntdRegistry>
          </UserProvider>
        </ReduxProviderClient>
      </body>
    </html>
  );
}
