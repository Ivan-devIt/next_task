import { FC, ReactNode } from 'react';
import { PrivateRouteProvider } from '@/components/Providers';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  return <PrivateRouteProvider>{children}</PrivateRouteProvider>;
};

export default Dashboard;
