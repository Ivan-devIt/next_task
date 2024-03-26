import { E_Pages } from '@/types';

export const navigateData = {
  //FIX
  admin: {
    [E_Pages.dashboard]: {
      [E_Pages.users]: {
        [E_Pages.create]: `${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.create}`,
        [E_Pages.update]: `${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.update}`,
        [E_Pages.remove]: `${E_Pages.dashboard}/${E_Pages.users}/${E_Pages.remove}`
      },
      [E_Pages.profile]: '',
      [E_Pages.news]: ''
    }
  }
};
