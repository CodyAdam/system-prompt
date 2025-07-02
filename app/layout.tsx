import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono, Pangolin  } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const pangolin = Pangolin({
  subsets: ["latin"],
  variable: "--font-pangolin",
  display: "swap",
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "System Prompt",
  description:
    "System Prompt is a free, locally-run tool designed to simplify and enhance your interaction with AI models. Move beyond endlessly retyping the same instructions. With System Prompt, you can save, manage, and chain your AI queries in a powerful visual canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pangolin.variable} antialiased`}>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
