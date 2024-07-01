import ToastProvider from "@/modules/shared/presentation/components/providers/ToastProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ducen Academy",
  description: "Empowering minds, shaping future",
  icons: {
    icon: {
      url: "/favicon.ico",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true} >
          <NextTopLoader 
            color="#9747FF"
            height={5}
            shadow={false}
            showSpinner={false}
          />
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
