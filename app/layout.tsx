import './globals.css';
import 'flowbite/dist/flowbite.css';
import { Quicksand } from 'next/font/google';
// import { usePathname } from 'next/navigation';
import Navbar from './components/navbar';

const quicksand = Quicksand({
  subsets: ['latin']
});

export default function RootLayout({ children }: any) {

  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Navbar />
        <div className="pt-20 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
