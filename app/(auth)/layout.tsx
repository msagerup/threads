import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import "../globals.css";

export const metadata = {
  title: "Threads",
  description: "A next.js 13 Meta Threads clone Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
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
        <body
          className={`${inter.className} bg-dark-1`}
          suppressHydrationWarning={true}
        >
          <div className='w-full flex justify-center items-center min-h-screen'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
