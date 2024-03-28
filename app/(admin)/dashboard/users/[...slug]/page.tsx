import { E_DashboardRoutes } from '@/types';
import { getIncludesPages } from '@/utils';
import { notFound } from 'next/navigation';

export default async function page({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const usersPages = getIncludesPages(E_DashboardRoutes.users);

  if (!usersPages.includes(slug[0])) {
    return notFound();
  }

  return <div>USERS === {slug[0]}</div>;
}

export async function generateStaticParams() {
  const usersPages = getIncludesPages(E_DashboardRoutes.users);

  return usersPages.map(page => ({
    slug: [page]
  }));
}
