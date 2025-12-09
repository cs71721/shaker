import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaker - Text Message Mixer",
  description: "Mix personality vibes to create the perfect text message",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shaker",
  },
};

export const viewport: Viewport = {
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
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
