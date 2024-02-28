import { LoginForm } from '@/components';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="w-full">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
