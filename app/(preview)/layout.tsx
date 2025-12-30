import Script from 'next/script';

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preview pages are client components that handle their own full HTML
  // This layout just passes through
  return children;
}
