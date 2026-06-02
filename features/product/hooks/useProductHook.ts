import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/fetch';
import { ProductProps } from '@/types/ProductType';
import { useCategoryId } from '@/stores/useCategoryId';



const useProductHook = () => {
  const {categoryId} = useCategoryId()
    const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch:refetchProducts
  } = useInfiniteQuery<ProductProps, Error, any, any, number>({
    queryKey: ["products", categoryId],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts(2, categoryId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
    enabled: !!categoryId,
    // Each category: fetch once, then use cache (Men, Women, Teens & Kids, …)
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const allProducts =
    data?.pages.flatMap((page: any) => page.products) ?? [];
  
  return {
    allProducts,
    isPending,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetchProducts
  }
}

export default useProductHook