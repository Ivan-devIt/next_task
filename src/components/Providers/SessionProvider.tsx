'use client';
import { SessionProvider } from 'next-auth/react';

interface I_SessionProviderWrapperProps {
  children: React.ReactNode;
}

export const SessionProviderWrapper = ({
  children
}: I_SessionProviderWrapperProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
