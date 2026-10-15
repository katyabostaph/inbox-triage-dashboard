import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReadyQueue } from "@/components/ReadyQueue";
import { Providers } from "@/components/Providers";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Inbox Triage",
  title: "Inbox Triage",
  description:
    "Progress and control surface for the tagged inbox — mark senders Ready and copy a precise agent command.",
  appleWebApp: {
    capable: true,
    title: "Inbox Triage",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground">
        <RegisterServiceWorker />
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <header className="safe-top sticky top-0 z-20 border-b border-white/8 bg-[#0A0A0B]/75 backdrop-blur-xl">
              <div className="safe-x mx-auto flex w-full max-w-6xl items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                    Inbox triage
                  </p>
                  <p className="text-base font-semibold text-white sm:text-lg">
                    Progress & control
                  </p>
                </div>
                <p className="hidden text-right text-xs text-white/35 sm:block">
                  Tagged first pass
                  <br />
                  Visibility only — you stay in control
                </p>
              </div>
            </header>
            <main className="safe-x mx-auto w-full max-w-6xl flex-1 py-6 sm:py-8">
              {children}
            </main>
            <div className="sticky bottom-0 z-20">
              <ReadyQueue />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
