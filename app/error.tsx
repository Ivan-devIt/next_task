'use client';

// TODO
export default function ErrorWrapper({ error }: { error: Error }) {
  return (
    <>
      <h1>Ooops somethin wrong !!!</h1>
      <p>{error.message}</p>
    </>
  );
}
