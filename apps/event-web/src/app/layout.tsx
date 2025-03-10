import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { SessionProvider } from '../components/SessionProvider';
import useColorMode from '@/hook/useColorMode';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventHub - Discover and Book Amazing Events',
  description: 'Your one-stop platform for discovering, booking, and managing events',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <SessionProvider session={session}>
     
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto pt-16">
              {children}
            </main>
          
          </div>

          <Toaster position="bottom-right" />
         
        </SessionProvider>
      </body>
    </html>
  );
}