import { E_DashboardRoutes } from '@/types';

export const getIncludesPages = (path: E_DashboardRoutes) => {
  const pagesGroupsInfo = Object.values(E_DashboardRoutes).filter(el =>
    el.includes('/')
  );

  return pagesGroupsInfo
    .filter(el => el.includes(path))
    .map(el => el.slice(path.length + 1))
    .map(el => (el.includes('/') ? el.slice(0, el.indexOf('/')) : el))
    .filter(Boolean)
    .reduce(
      (res: string[], el: string) => (res.includes(el) ? res : [...res, el]),
      []
    );
};
