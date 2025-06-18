import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GeometricCursor from "@/components/geometric-cursor";
import "reactflow/dist/style.css";
import ThemeProviderClient from "@/components/ThemeProviderClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PCUBE Portfolio | Pankaj Pandey",
  description:
    "Portfolio of Pankaj Pandey - Full Stack Developer specializing in MERN stack, AI/ML implementations, and cloud computing solutions.",
  icons: { icon: "/favicon.ico" },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProviderClient>
          <GeometricCursor />
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}

export default RootLayout;
