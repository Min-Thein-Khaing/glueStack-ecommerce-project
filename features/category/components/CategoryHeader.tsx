import { fetchCategories } from "@/api/fetch";
import Title from "@/components/Title";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import CategoryList, { CategoryProps } from "./CategoryList";
import ProductSection from "@/features/product/components/ProductSection";
import { useCategoryId } from "@/stores/useCategoryId";


const CategoryHeader = () => {
  const [selectedId, setSelectedId] = useState(0);


    const {setCategoryId} = useCategoryId()
  const {
    data: categories,
    isError,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    // retry:7 // that is overwrite is using default 5 time you in _mainLayout
  });

  useEffect(()=>{
    if(categories && categories.length > 0){
      setSelectedId(categories[0].id)
    }
  },[categories])

  if (isError) {
    return (
      <VStack className="items-center justify-center py-6 px-4 gap-3 bg-gray-50 rounded-lg border border-gray-200 my-2">
        <Text className="text-red-500 font-medium text-center">
          {error?.message ||
            "Failed to load categories. Check your connection."}
        </Text>
        <Button
          onPress={() => refetch()}
          size="sm"
          variant="solid"
          className="bg-primary-500 rounded"
        >
          <ButtonText>Retry</ButtonText>
        </Button>
      </VStack>
    );
  }
  
  const handlePress = (id: number) => {
    setSelectedId(id);
    setCategoryId(id);
  };
  return (
    <VStack className=" mt-2 ">
      <Title title="Shop by Category" btnTitle="See more" />
      {isPending ? (
        <HStack>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-[56px] h-[56px] mx-2 bg-gray-300 rounded-full"
            />
          ))}
        </HStack>
      ) : (
        <FlashList
          data={categories as CategoryProps[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CategoryList
              {...item}
              isSelected={item.id === selectedId}
              onPress={handlePress}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={selectedId}
          estimatedItemSize={80}
          contentContainerStyle={{ paddingHorizontal: 5, marginVertical: 5 }}
        />
      )}
      <ProductSection categoryId={selectedId} />
    </VStack>
  );
};

export default CategoryHeader;
