import { E_DashboardRoutes, E_Pages, E_Role } from '@/types';

export const linksByRoles = [
  {
    title: E_Pages.news,
    roles: [E_Role.ADMIN, E_Role.MANAGER, E_Role.CUSTOMER],
    href: E_DashboardRoutes.news
  },
  {
    title: E_Pages.users,
    roles: [E_Role.ADMIN],
    href: E_DashboardRoutes.users
  },

  {
    title: E_Pages.profile,
    roles: [E_Role.ADMIN, E_Role.MANAGER, E_Role.CUSTOMER],
    href: E_DashboardRoutes.profile
  }
];
