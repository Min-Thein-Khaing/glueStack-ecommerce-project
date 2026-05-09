import React from 'react'
import { VStack } from '@/components/ui/vstack'
import { Image } from 'expo-image'


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const Banner = () => {
  return (
    <VStack>
      <Image
        style={{ width: "100%", aspectRatio: 19 / 9 }}
        source={require("@/data/shop/banner6.png")}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      </VStack>
  )
}

export default Banner