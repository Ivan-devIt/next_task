import { T_UserControllList } from '@/utils/staticData';
import { SettingMenuItem } from './SettingMenuItem';

type T_SettingMenuProps = {
  data: T_UserControllList;
  name: string;
};

export const SettingMenu = ({ data, name }: T_SettingMenuProps) => {
  return (
    <div className="bg-slate-300 h-full">
      <h4 className="p-4 text-[1.25rem] text-indigo-950 font-semibold">
        {name}
      </h4>
      <ul className="flex flex-col gap-2">
        {data.map(item => (
          <li key={item.id}>
            <SettingMenuItem data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
