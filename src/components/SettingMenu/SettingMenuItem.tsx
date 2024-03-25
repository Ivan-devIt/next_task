import { T_UserControllList } from '@/utils/staticData';

type T_SettingMenuItem = T_UserControllList[0];

export const SettingMenuItem = ({ data }: { data: T_SettingMenuItem }) => {
  const { id, action, title, icon } = data;
  return (
    <div className="w-full px-4 py-2 cursor-pointer transition-colors duration-300 text-indigo-900 hover:bg-slate-400 text-md hover:text-indigo-700 flex gap-4 items-center">
      <div className="h-5 w-5">{icon}</div>
      <div>{title}</div>
    </div>
  );
};
