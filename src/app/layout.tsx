import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: 'Studymate',
  description: ''
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950">
        {children}
      </body>
    </html>
  );
}
