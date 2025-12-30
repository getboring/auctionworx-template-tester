import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AuctionWorx Template Tester",
  description: "Test AuctionWorx templates without a live installation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
