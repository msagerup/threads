import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import TopBar from "@/components/shared/TopBar";
import LeftsideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightBar";
import BottomBar from "@/components/shared/BottomBar";
import { dark } from "@clerk/themes";
import { Suspense } from "react";
import Spinner from "@/components/shared/Spinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A next.js 13 Meta Threads clone Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className + ' custom-scrollbar'} suppressHydrationWarning={true}>
          <ToastContainer />
          <TopBar />
          <main className='flex flex-row'>
            <LeftsideBar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                <Suspense fallback={<Spinner />}>{children}</Suspense>
              </div>
            </section>
              <RightSideBar />
          </main>
          <BottomBar />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
