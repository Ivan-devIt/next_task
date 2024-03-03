'use client';

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h1>Ooops some wrong !!! {error.message}</h1>;
}
