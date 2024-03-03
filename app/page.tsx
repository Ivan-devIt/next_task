import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | News portal'
};

export default async function Home() {
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
    </>
  );
}
