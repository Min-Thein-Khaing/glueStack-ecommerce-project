import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Card } from "@/components/ui/card";
import { ProductProps } from "@/types/ProductType";
import { Image } from "expo-image";

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
  users,
  description,
}: ProductProps) => {
  return (
    <Pressable className="">
      <Card className="p-2">
        <Image
          style={{ width: "100%", aspectRatio: 3 / 4, borderRadius: 5 }}
          source={image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </Card>
    </Pressable>
  );
};

export default ProductList;
