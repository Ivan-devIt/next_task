'use client';

import { I_Pagination, I_ResponseMessage, T_UserPublic } from '@/types';

export const UsersList = async () => {
  const usersResponse = await getUsers({ skip: 30 });

  const { data } = usersResponse;

  return (
    <div>
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
};

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
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?page=${page}&skip=${skip}`,
    {
      method: 'GET',
      // cache: 'no-cache' //TODO
      next: {
        revalidate: 10 //sec
      }
    }
  );

  if (!users.ok) {
    throw new Error('ssssssssssss asdaddasdas sads');
  }

  return users.json();
}
