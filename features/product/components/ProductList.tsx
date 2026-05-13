import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Card } from "@/components/ui/card";
import { ProductProps } from "@/types/ProductType";
import { Image } from "expo-image";
import { Icon } from "@/components/ui/icon";
import { Heart,Star } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { useRouter } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ProductList = ({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  colors,
  sizes,
  users = [], // default value ပေးထားခြင်းဖြင့် undefined ဖြစ်မှာကို ကာကွယ်နိုင်တယ်
  description,
}: ProductProps) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.navigate({pathname:"/detail",params:{id:id}})}>
      <Card className="p-2">
        <Image
          style={{ width: "100%", aspectRatio: 3 / 4, borderRadius: 5 }}
          source={image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        
        {/* Favorite Icon Logic */}
        <Pressable className="absolute top-4 right-4 w-8 h-8 rounded-full items-center justify-center bg-[#00000015]">
          <Icon 
            // String အစား Component ကို တိုက်ရိုက် pass လုပ်ပါ
            as={Heart} 
            className={`${users?.length > 0 ? "fill-red-500 stroke-none" : "text-red-500"}`} 
            size="lg" 
          />
        </Pressable>
        <VStack className="gap-1 my-1">
          <HStack className="justify-start items-center gap-2">
            <Text className="">{brand}</Text>
            <Icon as={Star} className="text-yellow-500" size="sm" />
            <Text className="">{star}</Text>
            <Text className="">({quantity})</Text>
          </HStack>
          <Text>{title.length > 21 ? title.slice(0, 21) + "..." : title}</Text>
          <HStack className="items-center gap-2">
            <Text className="text-lg font-bold text-green-600">${price.toFixed(2)}</Text>
            {discount > 0 && (
              <Text className="text-sm font-medium text-red-500 line-through">${discount.toFixed(2)}</Text>
            )}
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
};

export default ProductList;