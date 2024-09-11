"use client";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "H-tube",
//   description: "Video của Huy",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextTopLoader
          color="#EE0033"
          height={2}
          shadow="none"
          showSpinner={false}
          crawlSpeed={300}
        />
        <Provider store={store}>
          <AntdRegistry>
            <Suspense fallback={<>Loading</>}>{children}</Suspense>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
