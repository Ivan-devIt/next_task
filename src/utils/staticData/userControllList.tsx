import {
  AddUserIcon,
  SettingIcon,
  TrashIcon,
  UserIcon,
  UsersIcon
} from '@/components/Ui/Icons';
import { E_UserAction } from '@/types';

export const userControllList = [
  {
    id: '1',
    title: 'User info',
    action: E_UserAction.FIND_ONE,
    icon: <UserIcon className="h-full w-full" />
  },
  {
    id: '2',
    title: 'Users list',
    action: E_UserAction.SEARCH,
    icon: <UsersIcon className="h-full w-full" />
  },
  {
    id: '3',
    title: 'Update user',
    action: E_UserAction.UPDATE,
    icon: <SettingIcon className="h-full w-full" />
  },
  {
    id: '4',
    title: 'Create',
    action: E_UserAction.CREATE,
    icon: <AddUserIcon className="h-full w-full" />
  },
  {
    id: '5',
    title: 'Remove',
    action: E_UserAction.DELETE,
    icon: <TrashIcon className="h-full w-full" />
  }
];

export type T_UserControllList = typeof userControllList;
