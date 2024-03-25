import { useSession } from 'next-auth/react';

export const useUsers = () => {
  //get session
  const session = useSession();

  console.log('session', session);
};
