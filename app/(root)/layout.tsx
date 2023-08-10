import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import TopBar from "@/components/shared/TopBar";
import LeftsideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightBar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata : Metadata = {
  title: "Threads",
  description: "A next.js 13 Meta Threads clone Application",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <TopBar />
          <main className='flex flex-row'>
            <LeftsideBar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
