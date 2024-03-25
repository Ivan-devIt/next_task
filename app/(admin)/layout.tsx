import { FC, ReactNode } from 'react';
import { PrivateRouteProvider } from '@/components/Providers';

interface I_AdminDashboardProps {
  children: ReactNode;
}

const AdmonDashboard: FC<I_AdminDashboardProps> = ({ children }) => {
  return (
    <PrivateRouteProvider>
      <div>{children}</div>
    </PrivateRouteProvider>
  );
};

export default AdmonDashboard;
