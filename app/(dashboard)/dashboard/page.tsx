import { E_Pages, E_Routes } from '@/types';
import { E_SearchParam } from '@/types/search.params.enum';
import { authOptions } from '@/utils/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  // const session = await getServerSession(authOptions);

  // if (!!session && session?.user) {
  //   return (
  //     <div>
  //       {' '}
  //       Welcome to admin page <h2>{session?.user.name}</h2>
  //     </div>
  //   );
  // }

  // return redirect(
  //   `${E_Routes.signIn}?${E_SearchParam.callbackUrl}=${E_Pages.dashboard}`
  // );
  return <div> Welcome to admin page</div>;
};

export default page;
