'use server';
// import { UsersList } from '@/components/UsersList/UsersList';
import { I_Pagination, I_ResponseMessage, T_UserPublic } from '@/types';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';

export default async function page() {
  const usersResponse = await getUsers({ skip: 30 });

  const { data } = usersResponse;

  return (
    <div>
      <h1>Welcome to admin page</h1>
      {/* <UsersList /> */}
      {!!data?.users && (
        <div>
          {data.users.map(({ name, email, role, id }) => (
            <div key={id}>
              <h3>
                User name:{name} ({role})
              </h3>
              <p>Email: {email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function getUsers({
  page,
  skip
}: {
  page?: number;
  skip?: number;
}): Promise<
  I_ResponseMessage<{
    pagination: I_Pagination;
    users: T_UserPublic[];
  }>
> {
  const tokenSession = cookies().get('next-auth.session-token');

  const users = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?page=${page}&skip=${skip}`,
    {
      method: 'GET',
      cache: 'no-cache', //TODO
      headers: {
        tokenSession: String(tokenSession?.value)
      }
      // next: { //TODO
      //   revalidate: 10 //sec
      // }
    }
  );

  return users.json();
}
