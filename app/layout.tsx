'use client';

import './globals.css';
import 'flowbite/dist/flowbite.css';
import { Quicksand } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Navbar from './components/navbar'; // ← IMPORT NAVBAR

const quicksand = Quicksand({
  subsets: ['latin']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
