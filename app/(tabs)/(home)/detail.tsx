import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ViewPager from "@/features/product/components/ViewPager";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";

import CartSection from "@/components/CartSection";
import { Pressable } from "@/components/ui/pressable";

const Detail = () => {
  const router = useRouter();
  return (
    <VStack>
      <Stack.Screen
        options={{
          headerTitle: "Product Detail",
          headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
          headerTitleAlign: "center",
          headerShadowVisible: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <HStack className="gap-1 items-center">
                <Icon className="" as={ChevronLeft} size="xl" />
                <Text className="text-md font-bold text-black">Home</Text>
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
    </VStack>
  );
};

export default Detail;
