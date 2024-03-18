import LayoutClient from "@/components/LayoutClient";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Technical Test Vocagame",
  description:
    "Technical Test Vocagame by Salman Dwi Maulana Akbar, For Role: Frontend Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <LayoutClient children={children} />
    </CookiesProvider>
  );
}
