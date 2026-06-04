import { VStack } from "@/components/ui/vstack";
import ProductList from "./ProductList";
import { FlashList } from "@shopify/flash-list";
import { ProductProps } from "@/types/ProductType";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
  ActivityIndicator,
  Dimensions,
  NativeSyntheticEvent,
  RefreshControl,
} from "react-native";
import { HStack } from "@/components/ui/hstack";
import useProductHook from "../hooks/useProductHook";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@/components/ui/icon";
import { ArrowUp, BaggageClaim } from "lucide-react-native";
import useRefreshByUser from "@/hooks/useRefreshByUser";
import ProductHeader from "./ProductHeader";
import CategoryHeader from "@/features/category/components/CategoryHeader";
import Title from "@/components/Title";
import { Fab, FabIcon } from "@/components/ui/fab";
import { useRef, useState } from "react";
import { NativeScrollEvent } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { fetchToggleProductFavourite } from "@/api/fetch";
const ProductSkeletonGrid = () => (
  <HStack className="flex-wrap justify-between px-4 gap-y-4 pt-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="h-56 w-[48%] md:w-[23%] rounded-lg" />
    ))}
  </HStack>
);

const ProductSection = () => {
  const width = Dimensions.get("window").width;
  const numCol = width < 600 ? 2 : width < 768 ? 3 : 4;
  const {
    allProducts,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    refetchProducts,
  } = useProductHook();

  const { refreshing, onRefresh } = useRefreshByUser(refetchProducts);
  const scrollRef =
    useRef<React.ElementRef<typeof FlashList<ProductProps>>>(null);
  const [showFab, setShowFab] = useState(false);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 300) {
       setShowFab(true); // Show if scrolled past 300px
    } else {
      setShowFab(false); // Hide if near the top
    }
  };

  const handleTop = () => {
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const isFirstLoadForCategory = isPending && allProducts.length === 0;
  
  const listHeader = (
    <>
      <ProductHeader />
      <CategoryHeader />
      <Title title="Recommended For You" btnTitle="See more" />
    </>
  );

  const listEmpty = isFirstLoadForCategory ? (
    <ProductSkeletonGrid />
  ) : isError ? (
    <VStack className="items-center justify-center py-6 px-4 gap-3 bg-gray-50 rounded-lg border border-gray-200 my-2 mx-4">
      <Text className="text-red-500 font-medium text-center">
        {error instanceof Error
          ? error.message
          : "Failed to load products. Check your connection."}
      </Text>
      <Pressable
        onPress={() => refetchProducts()}
        className="bg-primary-500 rounded px-4 py-2"
      >
        <Text className="text-white">Retry</Text>
      </Pressable>
    </VStack>
  ) : (
    <VStack className="items-center h-56 justify-center py-6 px-4 gap-3 rounded-lg my-2">
      <Icon as={BaggageClaim} className="size-20 text-gray-500" />
      <Text className="text-gray-500 font-medium text-lg">
        No products found
      </Text>
    </VStack>
  );

  const listFooter = () => {
    if (isFetchingNextPage) {
      return (
        <ActivityIndicator size="large" color="#0000ff" className="py-4" />
      );
    }
    if (allProducts.length > 0 && !hasNextPage) {
      return (
        <VStack className="items-center justify-center py-6 px-4 gap-3 bg-gray-50 rounded-lg border border-gray-200 my-2">
          <Text className="text-gray-500 font-medium text-lg">
            No more products
          </Text>
        </VStack>
      );
    }
    return null;
  };

  return (
    <>
      <FlashList
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
        data={isFirstLoadForCategory ? [] : (allProducts as ProductProps[])}
        numColumns={numCol}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductList {...item} />}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={listFooter}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {showFab && (
        <Fab
          onPress={handleTop}
          size="sm"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
        >
          <FabIcon as={ArrowUp} />
        </Fab>
      )}
    </>
  );
};

export default ProductSection;
