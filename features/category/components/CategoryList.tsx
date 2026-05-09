import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import React from "react";

export interface CategoryProps {
  id: number;
  name: string;
  image: any;
  isSelected?: boolean;
  onPress?: (id: number) => void;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const CategoryList = ({
  id,
  name,
  image,
  isSelected,
  onPress,
}: CategoryProps) => {
  return (
    <Pressable onPress={() => onPress?.(id)}>
      <Card 
      >
        <VStack  className="justify-center gap-2 items-center">
          <Image
            style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 3, borderColor: isSelected ? "#fcba03" : "transparent" }}
            source={image}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Text className="text-md font-medium text-black">{name}</Text>
        </VStack>
      </Card>
    </Pressable>
  );
};

export default CategoryList;
