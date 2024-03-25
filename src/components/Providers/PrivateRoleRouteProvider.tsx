'use client';
import { E_DashboardRoutes, E_Role } from '@/types';
import { E_SearchParam } from '@/types/search.params.enum';
import { useSession } from 'next-auth/react';
import { usePathname, redirect } from 'next/navigation';

interface I_PrivateProviderProps {
  children: React.ReactNode;
  isOnlyAdminAccess?: boolean;
  isManagerAccess?: boolean;
}

export const PrivateRoleRouteProvider = ({
  children,
  isOnlyAdminAccess,
  isManagerAccess
}: I_PrivateProviderProps) => {
  const session = useSession();
  const pathName = usePathname();
  const isAutenticated = !!session?.data && session?.status === 'authenticated';
  const isRoleAdmin = session?.data?.user?.role === E_Role.ADMIN;
  const isRoleManager = session?.data?.user?.role === E_Role.MANAGER;

  console.log('PrivateRoleRoutePrivider session==', session);

  //redirect if not authenticated
  if (!isAutenticated) {
    return redirect(
      `${E_DashboardRoutes.signIn}?${E_SearchParam.callbackUrl}=${pathName.slice(1)}`
    );
  }

  // if only ADMIN access then check if not ADMIN redirect
  if (isOnlyAdminAccess) {
    if (isRoleAdmin) {
      return <>{children}</>;
    } else {
      return redirect(
        `${E_DashboardRoutes.signIn}?${E_SearchParam.callbackUrl}=${pathName.slice(1)}`
      );
    }
  }

  // if MANAGER access then check if not MANAGER or ADMIN redirect
  if (isManagerAccess) {
    if (isRoleAdmin && isRoleManager) {
      return <>{children}</>;
    } else {
      return redirect(
        `${E_DashboardRoutes.signIn}?${E_SearchParam.callbackUrl}=${pathName.slice(1)}`
      );
    }
  }

  // return for ADMIN, MANAGER, CUSTOMER
  return <>{children}</>;
};
