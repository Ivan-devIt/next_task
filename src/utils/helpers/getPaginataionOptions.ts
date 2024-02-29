import { I_Pagination } from '@/types';
import { E_SearchParam } from '@/types/search.params.enum';

interface I_GetPaginataionOptions {
  searchParams: URLSearchParams;
  count: number;
  defaultSkip?: number;
  maxSkip?: number;
  defaultPage?: number;
}

export function getPaginataionOptions({
  searchParams,
  count,
  defaultSkip = 10,
  maxSkip = 100,
  defaultPage = 1
}: I_GetPaginataionOptions): I_Pagination {
  const skipParam = Number(searchParams.get(E_SearchParam.skip) || defaultSkip);

  const skipValue =
    !!skipParam && skipParam <= maxSkip && skipParam <= count
      ? skipParam
      : count <= maxSkip
        ? count
        : defaultSkip;

  const pageParam = Number(searchParams.get(E_SearchParam.page) || defaultPage);

  const pageValue = !!pageParam
    ? pageParam <= Math.ceil(count / skipValue)
      ? Math.floor(pageParam)
      : Math.ceil(count / skipValue)
    : defaultPage;

  const pagination = {
    count,
    page: pageValue,
    skip: skipValue,
    pages: Math.ceil(count / skipValue)
  };

  return pagination;
}
