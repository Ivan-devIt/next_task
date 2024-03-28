import {
  AddUserIcon,
  SettingIcon,
  TrashIcon,
  UsersIcon
} from '@/components/Ui/Icons';
import { E_DashboardRoutes, E_UserAction } from '@/types';

export const userControllList = [
  // {
  //   id: '1',
  //   title: 'User info',
  //   action: E_UserAction.FIND_ONE,
  //   icon: <UserIcon className="h-full w-full" />,
  //   link: E_DashboardRoutes.users_update //TODO
  // },
  {
    id: '2',
    title: 'Users list',
    action: E_UserAction.SEARCH,
    icon: <UsersIcon className="h-full w-full" />,
    link: E_DashboardRoutes.users //TODO
  },
  {
    id: '3',
    title: 'Update',
    action: E_UserAction.UPDATE,
    icon: <SettingIcon className="h-full w-full" />,
    link: E_DashboardRoutes.users_update
  },
  {
    id: '4',
    title: 'Create',
    action: E_UserAction.CREATE,
    icon: <AddUserIcon className="h-full w-full" />,
    link: E_DashboardRoutes.users_create
  },
  {
    id: '5',
    title: 'Remove',
    action: E_UserAction.DELETE,
    icon: <TrashIcon className="h-full w-full" />,
    link: E_DashboardRoutes.users_remove
  }
];

export type T_UserControllList = typeof userControllList;
