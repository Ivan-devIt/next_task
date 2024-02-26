import { NavBar } from '@/components';
import { Roboto } from 'next/font/google';
import './global.css';

// export const metadata = { //TODO think how do dis part correct
// 	// title: 'Flexibble',
// 	// description: 'Showcase and discover remarkable developer projects'
// };

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>News portal | Next</title>
        <link rel="icon" type="image/x-icon" href="/icons/mail3.svg" />
      </head>
      <body className={`${roboto.className} bg-slate-200`}>
        <NavBar />
        <main className={'p-5'}>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
};

export default RootLayout;
