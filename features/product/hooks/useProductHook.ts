
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/fetch';
import { ProductProps } from '@/types/ProductType';



const useProductHook = (categoryId: number) => {

    const {
    data,
    isPending,
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
    // --- ဒီအပိုင်းလေးတွေ ထည့်ပေးပါ ---
    staleTime: 1000 * 60 * 15, // ၅ မိနစ်အတွင်း ဒီ category ကို ပြန်ခေါ်ရင် cache ထဲကပဲ ယူမယ်၊ API ထပ်မခေါ်ဘူး
    // gcTime: 1000 * 60 * 10, // 10 minutes cache duration for garbage collection

    enabled: !!categoryId
  });
  const allProducts = data?.pages.flatMap((page:any) => page.products) || [];
  
  
  return {
    allProducts,
    isPending,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetchProducts
  }
}

export default useProductHook