import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aix For Careers",
  description: "Generate Resume, boolean search strings powered by Instill AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${inter.className}, bg-gradient-to-tr from-green-400 to-yellow-400`}
      >
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
