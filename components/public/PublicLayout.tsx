import Header from './Header';
import Footer from './Footer';
import { FirmSettings } from '@/lib/types/database';

interface PublicLayoutProps {
  children: React.ReactNode;
  settings: FirmSettings;
}

export default function PublicLayout({ children, settings }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
