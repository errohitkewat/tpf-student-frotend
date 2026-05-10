import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/provider/react-query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TFP Coding Classes Dashboard",
  description:
    "A clean management dashboard for students, courses, batches, teachers, enquiries, fees and certificates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 font-sans antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>

        <Toaster
          richColors
          position="top-right"
          closeButton
          toastOptions={{
            className: "rounded-xl border border-slate-200 shadow-sm",
          }}
        />
      </body>
    </html>
  );
}