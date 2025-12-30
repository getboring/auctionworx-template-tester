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
  // Root layout is minimal - actual styling is handled by admin/preview layouts
  return children;
}
