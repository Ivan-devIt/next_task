import Link from 'next/link';
import { Logo } from '..';

export const NavBar = () => {
  return (
    <header className="py-4 px-5  bg-indigo-950">
      <div className="flex justify-between items-center max-w-screen-3xl mx-auto">
        <a href="/">
          <Logo />
        </a>
        <nav>
          <Link href={'/sign-in'}>Sign in</Link>
        </nav>
      </div>
    </header>
  );
};
