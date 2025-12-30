import '@/app/globals.css';
import Sidebar from '@/components/admin/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AuctionWorx Admin',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
