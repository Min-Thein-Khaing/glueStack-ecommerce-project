import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Image } from 'expo-image';
import React from 'react';
import {BaggageClaim} from 'lucide-react-native'


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const HomeNavBar = () => {
  const cartItemsCount =9;
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
        <Box className="items-center">
          <VStack>
            <Badge
              className={`z-10 self-end justify-center items-center ${cartItemsCount > 9 ? "h-5 w-5" : "h-4 w-4"} bg-red-600 rounded-full p-0 -mb-4 -mr-2 min-w-0`}
              variant="solid"
            >
              <BadgeText className={`${"text-white text-[10px] self-center font-bold leading-none " }`}>{cartItemsCount}</BadgeText>
            </Badge>
              <Button variant='link'>
                <ButtonText className="text-typography-800 ">
                  <Icon className='' as={BaggageClaim} size='xl'  />
                </ButtonText>
            </Button>
          </VStack>
        </Box>
      </Pressable>
    </HStack>
  )
}

export default HomeNavBar