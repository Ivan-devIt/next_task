'use client';
import { E_DashboardRoutes } from '@/types';
import { E_SearchParam } from '@/types/search.params.enum';
import { useSession } from 'next-auth/react';
import { usePathname, redirect } from 'next/navigation';

interface I_PrivateProviderProps {
  children: React.ReactNode;
}

export const PrivateRouteProvider = ({ children }: I_PrivateProviderProps) => {
  const session = useSession();
  const pathName = usePathname();

  if (!!session?.data && session?.status === 'authenticated') {
    return <>{children}</>;
  }

  redirect(
    `${E_DashboardRoutes.signIn}?${E_SearchParam.callbackUrl}=${pathName.slice(1)}`
  );
};
