import { E_CommonRoutes } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center h-[90vh] overflow-hidden">
        <Image
          src="/images/not_found_page.jpg"
          width={800}
          height={400}
          alt="not found img"
        />
        <Link
          href={E_CommonRoutes.home}
          className="text-[30px] text-indigo-100 py-3 px-6 bg-indigo-900 rounded-[1rem]"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
