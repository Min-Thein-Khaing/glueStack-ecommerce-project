import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ViewPager from "@/features/product/components/ViewPager";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";

import CartSection from "@/components/CartSection";
import { Pressable } from "@/components/ui/pressable";
import { products } from "@/data";
import { ScrollView } from "react-native";
import ProductDetail from "@/features/product/components/ProductDetail";
import TapButton from "@/components/TapButton";

const Detail = () => {
  const router = useRouter();
  const {id} = useLocalSearchParams()
  const product = products.find((product) => product.id === Number(id));
  return (
    <VStack className="flex-1">
      <Stack.Screen
        options={{
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
          headerRight: () => (
            <Pressable className="">
              <CartSection />
            </Pressable>
          ),

        }}
      />
      <ViewPager />
      <ScrollView  showsVerticalScrollIndicator={false} className="bg-white flex-1">
        {product && <ProductDetail {...product}/>}
      </ScrollView>
      <TapButton />
    </VStack>
  );
};

export default Detail;
