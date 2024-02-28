'use client';
import Link from 'next/link';
import { Logo } from '..';
import { useSession, signOut } from 'next-auth/react';
import { E_Routes } from '@/types/routes.enum';

export const NavBar = () => {
  const session = useSession();
  console.log('==nav session==', session);

  return (
    <header className="py-4 px-5  bg-indigo-950">
      <div className="flex justify-between items-center max-w-screen-3xl mx-auto">
        <a href="/">
          <Logo />
        </a>
        <nav className="flex gap-4 text-indigo-50 transition-colors duration-300 hover:text-indigo-200">
          {/* <Link
            href={'/sign-in'}
            onClick={handleSignOut}
            className="text-indigo-50"
          >
            {ifNotAutorized ? 'Sign in' : 'Sign out'}
          </Link> */}
          {session?.data && <Link href={E_Routes.dashboard}>Dashboard</Link>}
          {session?.data ? (
            <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
              Sign Out
            </Link>
          ) : (
            <Link href={E_Routes.signIn}>Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};
