import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ViewPager from "@/features/product/components/ViewPager";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";

import CartSection from "@/components/CartSection";
import TapButton from "@/components/TapButton";
import { Pressable } from "@/components/ui/pressable";
import ProductDetail from "@/features/product/components/ProductDetail";
import { ScrollView } from "react-native";
import { fetchProductDetail } from "@/api/fetch";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {data:product ,refetch,isPending,isError} = useQuery({
          queryKey:["product", id],
          queryFn:() => fetchProductDetail(+id),
          
      })


  return (
    <VStack className="flex-1">
      <Stack.Screen
        options={{
          headerTintColor: "purple",
          headerTitle: "Product Detail",
          headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
          headerTitleAlign: "center",
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <HStack className="gap-1 items-center ">
                <Icon className="text-blue-600" as={ChevronLeft} size="xl" />
                <Text className="text-md font-bold text-blue-600">Home</Text>
              </HStack>
            </Pressable>
          ),
          headerRight: () => <CartSection />,
        }}
      />
      <ViewPager />
      
      {(isPending || product) && <ProductDetail isPending={isPending} {...product} />}
      
      
    </VStack>
  );
};

export default Detail;
