import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1E1210',
};

export const metadata: Metadata = {
  title: 'Salon Tablet Station | The Braid Bar NJ',
  description: 'In-Salon iPad Tablet Kiosk for browsing protective styles, lookbook photos, add-ons, and booking appointments.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BraidBar iPad',
  },
};

export default function TabletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tablet-kiosk-root w-full min-h-screen bg-[#FAF6F2] text-espresso select-none overflow-x-hidden">
      {children}
    </div>
  );
}
