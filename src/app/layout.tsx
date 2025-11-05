import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | CollabTract",
    default: "CollabTract - Planificateur intelligent de tournées de porte-à-porte et de distribution de prospectus",
  },
  description:
    "Plan faster. Deliver smarter. Measure what matters. CollabTract helps teams optimize door-to-door distribution routes and run high-impact flyering campaigns with data-driven insights.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl 3xl:max-w-screen-3xl overflow-hidden p-4 md:p-6 2xl:p-10 3xl:p-12">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
