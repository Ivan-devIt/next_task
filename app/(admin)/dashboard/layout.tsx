import { FC, ReactNode } from 'react';

interface I_DashboardProps {
  children: ReactNode;
}

const Dashboard: FC<I_DashboardProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default Dashboard;
