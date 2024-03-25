import { SettingMenu } from '@/components/SettingMenu';
import { userControllList } from '@/utils/staticData';
import { FC, ReactNode } from 'react';

interface I_UsersProps {
  children: ReactNode;
}

const UsersLayout: FC<I_UsersProps> = ({ children }) => {
  return (
    <div className="max-h-full flex overflow-hidden relative">
      <div className="fixed top-[h-header-lg] h-screen w-[30%] max-w-[16rem]">
        <SettingMenu data={userControllList} name={'Users'} />
      </div>
      <div className="pl-[40rem]">{children}</div>
    </div>
  );
};

export default UsersLayout;
