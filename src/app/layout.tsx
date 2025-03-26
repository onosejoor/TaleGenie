import type { Metadata } from "next";
import { Geist, Cherry_Swash } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import { Toast } from "@/hooks/useToast";
import Provider from "@/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const cherrySwash = Cherry_Swash({
  variable: "--font-cherry",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

export const metadata: Metadata = {
  title: {
    default: "TaleGenie",
    template: "%s | TaleGenie",
  },
  openGraph: {
    type: "website",
    title: "TaleGenie",
    description:
      "TaleGenie is an AI story maker, aimed to bring your story ideas to life!. We make it simple to bring your stories to life, so you can explore endless worlds of imagination!",
    url: "/",
    siteName: "TaleGenie",
    images: "/images/og-logo.png"
  },
  authors: [
    {
      name: "Onos Ejoor",
      url: "https://onos-ejoor.vercel.app",
    },
  ],
  description:
    "TaleGenie is an AI story maker, aimed to bring your story ideas to life!. We make it simple to bring your stories to life, so you can explore endless worlds of imagination!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${cherrySwash.variable} font-geist grid grid-rows-[auto_1fr_auto] overflow-x-hidden antialiased`}
      >
        <NextTopLoader color="var(--color-primary)" height={5} />
        <NavBar />
        <main className="talegenie-container grid min-h-dvh gap-20">
          {children}
        </main>
        <Provider>
          <Footer />
        </Provider>
        <Toast />
      </body>
    </html>
  );
}
