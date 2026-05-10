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
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react-native";

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
        ListFooterComponent={() => (
          <Button variant="outline" className="mx-auto my-1 bg-slate-100">
            <ButtonText>Explore More</ButtonText>
            <ButtonIcon as={MoveUpRight} />
          </Button>
        )}
      />
      
    </VStack>
  );
};

export default ProductSection;
