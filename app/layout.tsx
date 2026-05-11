import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeReal Growth Agent Prototype",
  description: "A mock growth dashboard agent built from illustrative BeReal growth metrics."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
