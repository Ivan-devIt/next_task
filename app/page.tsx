import { E_Routes } from '@/types/routes.enum';
import { config } from '@/utils/config';
import { User } from '@prisma/client';

const Home = async () => {
  //   const posts = await getAllPosts();

  //   console.log('==posts==', posts);

  const { data: users } = await getAllUsers();

  return (
    <>
      <div className="">
        <h1>Home</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et hic totam
          autem perspiciatis earum quia, minima laborum architecto
          necessitatibus exercitationem at aperiam sequi dolorum enim ipsa unde
          eum! Adipisci, optio?
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et hic totam
          autem perspiciatis earum quia, minima laborum architecto
          necessitatibus exercitationem at aperiam sequi dolorum enim ipsa unde
          eum! Adipisci, optio?
        </p>
      </div>
      <div>
        {!!users &&
          users.map(({ id, name, email }) => (
            <div key={id}>
              <h4>{name}</h4>
              <p>{email}</p>
            </div>
          ))}
      </div>
    </>
  );
};

// async function getAllPosts(): Promise<Post[]> {
//   const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
//     // cache: 'no-store' //TODO
//     next: { revalidate: 10 } // TODO
//   });

//   return res.json();
// }

async function getAllUsers(): Promise<{ data: User[] }> {
  const res = await fetch(
    `${config.env.NEXT_PUBLIC_BASE_URL}${E_Routes.users}`,
    {
      // cache: 'no-store' //TODO
      next: { revalidate: 60 } // TODO
    }
  );

  return res.json();
}

export default Home;
