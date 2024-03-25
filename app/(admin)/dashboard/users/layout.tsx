import { PrivateRoleRouteProvider } from '@/components';
import { SettingMenu } from '@/components/SettingMenu';
import { userControllList } from '@/utils/staticData';
import { FC, ReactNode } from 'react';

interface I_UsersProps {
  children: ReactNode;
}

const UsersLayout: FC<I_UsersProps> = ({ children }) => {
  return (
    <PrivateRoleRouteProvider isOnlyAdminAccess={true}>
      <div className="max-h-full flex overflow-hidden relative">
        <div className="fixed top-[h-header-lg] h-screen w-full max-w-[14rem]">
          <SettingMenu data={userControllList} name={'Users'} />
        </div>
        <div className="pl-[14rem]">{children}</div>
      </div>
    </PrivateRoleRouteProvider>
  );
};

export default UsersLayout;
