import { E_Routes, E_Pages } from '@/types';
import { E_SearchParam } from '@/types/search.params.enum';
import { authOptions } from '@/utils/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  // return <div> Welcome to PROFILE page</div>;

  // console.log('E_Pages===', E_Pages);

  // const session = await getServerSession(authOptions);

  // if (!!session && session?.user) {
  //   return (
  //     <div>
  //       {' '}
  //       Welcome to {E_Pages.profile} page <h2>{session?.user.name}</h2>
  //     </div>
  //   );
  // }

  // return redirect(
  //   `${E_Routes.signIn}?${E_SearchParam.callbackUrl}=${E_Pages.profile}`
  // );
  return <div> Welcome to {E_Pages.profile} page</div>;
};

export default page;
