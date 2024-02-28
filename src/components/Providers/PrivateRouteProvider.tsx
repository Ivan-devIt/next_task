'use client';
import { E_Pages, E_Routes } from '@/types';
import { E_SearchParam } from '@/types/search.params.enum';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, redirect } from 'next/navigation';

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
    `${E_Routes.signIn}?${E_SearchParam.callbackUrl}=${pathName.slice(1)}`
  );
};
