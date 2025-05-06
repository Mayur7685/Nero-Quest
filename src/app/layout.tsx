import { NeroProvider } from '@/contexts/NeroContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NeroProvider>
          {children}
        </NeroProvider>
      </body>
    </html>
  );
} 