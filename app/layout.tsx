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
    "Free open-source node-based AI workflow builder. Create reusable tasks with drag-and-drop nodes, chain AI operations, use any model with your API keys. Runs entirely in browser, your data stays private. Perfect for email automation, content creation, data processing, etc.",
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
