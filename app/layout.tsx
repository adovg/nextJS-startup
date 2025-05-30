import type { Metadata } from "next";
import { workSans } from "./fonts";
import "./globals.css";
import { Toaster } from "sonner";
// import "easymde/dist/easymde.min.css";

export const metadata: Metadata = {
  title: "Create Your StartUP",
  description: "Pitch your startup idea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
