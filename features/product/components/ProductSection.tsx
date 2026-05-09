import Title from "@/components/Title";
import { VStack } from "@/components/ui/vstack";
import ProductList from "./ProductList";
import { FlashList } from "@shopify/flash-list";
import { products } from "@/data";
import { ProductProps } from "@/types/ProductType";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Dimensions } from "react-native";
import { HStack } from "@/components/ui/hstack";

const ProductSection = () => {
  const width = Dimensions.get("window").width;
  const numCol = width < 600 ? 2 : width < 768 ? 3 : 4;

  return (
    <VStack className="gap-5">
      <Title title="Recommended For You" btnTitle="See more" />
      <FlashList
        contentContainerClassName="px-2" // className="px-2"
        data={products}
        numColumns={numCol}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductList {...item} />}
        estimatedItemSize={300}
        // contentContainerStyle={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        // columnWrapperStyle={{ paddingHorizontal: 10, marginVertical: 10 }}// not working in flashList working flatList
        // ListFooterComponent={() => (
        //   <HStack>
        //     <Pressable className="mx-auto mt-1">
        //       <Text className="border px-4 py-2 rounded-lg">Explore More</Text>
        //     </Pressable>
        //   </HStack>
        // )}
      />
      <HStack>
            <Pressable className="mx-auto mt-1">
              <Text className="border px-4 py-2 rounded-lg">Explore More</Text>
            </Pressable>
          </HStack>
    </VStack>
  );
};

export default ProductSection;
