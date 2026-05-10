
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Image } from 'expo-image';
import React from 'react';
import CartSection from '@/components/CartSection';


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const HomeNavBar = () => {
  
  return (
    <HStack className='justify-between items-center pr-3 mx-3 my-1 '>
      <Pressable className="">
        <Image
          style={{ width: 46, height: 23 }}
          source={require("@/assets/images/n.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </Pressable>

      <Pressable className=''>
        <CartSection />
      </Pressable>
    </HStack>
  )
}

export default HomeNavBar