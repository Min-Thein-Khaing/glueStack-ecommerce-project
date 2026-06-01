import Title from "@/components/Title";
import { VStack } from "@/components/ui/vstack";
import ProductList from "./ProductList";
import { FlashList } from "@shopify/flash-list";
import { ProductProps } from "@/types/ProductType";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { ActivityIndicator, Dimensions } from "react-native";
import { HStack } from "@/components/ui/hstack";
import useProductHook from "../hooks/useProductHook";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@/components/ui/icon";
import { BaggageClaim } from "lucide-react-native";

const ProductSection = ({ categoryId }: { categoryId: number }) => {
  const width = Dimensions.get("window").width;
  const numCol = width < 600 ? 2 : width < 768 ? 3 : 4;

  const { allProducts, isPending, isError, isFetchingNextPage,
    fetchNextPage,
    hasNextPage, error, refetchProducts } =
    useProductHook(categoryId);

  if (isPending) {
    return (
      <VStack className="gap-5">
        <Title title="Recommended For You" btnTitle="See more" />
        <HStack className="flex-wrap justify-between px-4 gap-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-56 w-[48%] md:w-[23%] rounded-lg"
            />
          ))}
        </HStack>
      </VStack>
    );
  }
  if (isError) {
    return (
      <VStack className="items-center justify-center py-6 px-4 gap-3 bg-gray-50 rounded-lg border border-gray-200 my-2">
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
    )
  }
  return (
    <VStack className="gap-5">
      <Title title="Recommended For You" btnTitle="See more" />
      {allProducts?.length === 0 ? (
        <VStack className="items-center h-56 justify-center py-6 px-4 gap-3 rounded-lg my-2">
          <Icon as={BaggageClaim} className="size-20 text-gray-500" />
          <Text className="text-gray-500 font-medium text-lg">No products found</Text>
        </VStack>
      ) : (<FlashList
        contentContainerClassName="px-2" // className="px-2"
        data={allProducts as ProductProps[]}
        // numColumns={numCol}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductList {...item} />}
        estimatedItemSize={300}
        //infinte working this place
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}

        // contentContainerStyle={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        // columnWrapperStyle={{ paddingHorizontal: 10, marginVertical: 10 }}// not working in flashList working flatList
        ListFooterComponent={() => (
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            allProducts.length > 0 && !hasNextPage && (
              <VStack className="items-center justify-center py-6 px-4 gap-3 bg-gray-50 rounded-lg border border-gray-200 my-2">
                <Text className="text-gray-500 font-medium text-lg">No more products</Text>
              </VStack>
            )
          )
        )}
      />)}
    </VStack>
  );
};

export default ProductSection;
