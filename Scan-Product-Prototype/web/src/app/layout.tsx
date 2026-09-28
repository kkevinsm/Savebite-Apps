import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import AppShell from "@/components/AppShell";
import { AuthProvider } from "@/context/AuthContext";
import { RecipesProvider } from "@/context/RecipesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import PWAInstallBanner from "@/components/PWAInstallBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savebite - Scan Food & Recipes",
  description: "Kelola dapur, kurangi pemborosan makanan. Scan bahan makanan, cek kedaluwarsa, dan temukan resep dengan AI.",
  applicationName: "Savebite",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Savebite",
  },
  openGraph: {
    type: "website",
    title: "Savebite",
    description: "Kelola dapur, kurangi pemborosan makanan",
    siteName: "Savebite",
  },
  twitter: {
    card: "summary",
    title: "Savebite",
    description: "Kelola dapur, kurangi pemborosan makanan",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  keywords: ["savebite", "food waste", "dapur", "resep", "scan makanan", "kedaluwarsa"],
};

export const viewport: Viewport = {
  themeColor: "#3CC63C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* PWA iOS specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Savebite" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-startup-image" href="/icon-512.png" />
        {/* Android Chrome */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3CC63C" />
      </head>
      <body className={`${inter.className} bg-[#3CC63C] sm:bg-gray-200`}>
        <LanguageProvider>
          <AuthProvider>
            <RecipesProvider>
              {/* On mobile: full screen no border. On desktop: phone mockup */}
              <div className="min-h-screen sm:flex sm:items-center sm:justify-center sm:py-8">
                <main className="w-full sm:max-w-sm sm:h-[844px] h-[100dvh] sm:rounded-[44px] sm:border-[8px] sm:border-gray-900 overflow-hidden relative bg-white sm:shadow-2xl flex flex-col">
                  <AppShell>
                    {children}
                  </AppShell>
                  <BottomNav />
                  <PWAInstallBanner />
                </main>
              </div>
            </RecipesProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

