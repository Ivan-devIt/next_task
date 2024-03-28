import { E_Pages } from '.';

/* eslint-disable */
export enum E_ApiRoutes {
  api = '/api',
  users = '/api/users'
}

export enum E_CommonRoutes {
  home = '/',
  signIn = `/${E_Pages.sign_in}`
}

export enum E_DashboardRoutes {
  // admin = '/admin',

  //private routes
  dashboard = `/${E_Pages.dashboard}`,
  users = `/${E_Pages.dashboard}/${E_Pages.users}`,
  users_update = `/${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.update}`,
  users_create = `/${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.create}`,
  users_remove = `/${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.remove}`,
  profile = `/${E_Pages.dashboard}/${E_Pages.profile}`,
  news = `/${E_Pages.dashboard}/${E_Pages.news}`,

  cambur = `/${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.update}/${E_Pages.news}/${E_Pages.profile}/${E_Pages.users}` //TODO remove this for text
}
