'use client';
import Link from 'next/link';
import { Logo } from '..';
import { useSession, signOut } from 'next-auth/react';
import { E_DashboardRoutes } from '@/types/routes.enum';
import { linksByRoles } from './data';
import { E_CommonRoutes, E_Role } from '@/types';

export const NavBar = () => {
  const session = useSession();
  // console.log('==nav session==', session);
  const userRole = String(session.data?.user?.role);
  const userLinksInfo = linksByRoles.filter(({ roles }) =>
    roles.includes(userRole as E_Role)
  );

  return (
    <header className="py-4 px-5  bg-indigo-950 h-header-lg size-header-lg">
      <div className="flex justify-between items-center max-w-screen-3xl mx-auto">
        <a href="/">
          <Logo />
        </a>
        <nav className="text-indigo-50 transition-colors duration-300 hover:text-indigo-200 w-full max-w-[30rem]">
          <ul className="flex gap-4 w-full capitalize text-md font-semibold ">
            {userRole &&
              userLinksInfo &&
              userLinksInfo.map(({ href, title }) => (
                <li
                  key={title}
                  className="transition-colors duration-300 hover:text-teal-300"
                >
                  <Link href={href}>{title}</Link>
                </li>
              ))}
            <li className="ml-auto transition-colors duration-300 hover:text-teal-300">
              {session?.data ? (
                <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
                  Sign Out
                </Link>
              ) : (
                <Link href={E_CommonRoutes.signIn}>Sign In</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
