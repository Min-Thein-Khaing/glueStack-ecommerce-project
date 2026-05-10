import { BaggageClaim } from 'lucide-react-native'
import React from 'react'
import { Badge, BadgeText } from './ui/badge'
import { Button, ButtonText } from './ui/button'
import { Icon } from './ui/icon'
import { VStack } from './ui/vstack'

const CartSection = () => {
  const cartItemsCount = 9;
  return (
    <VStack className="items-center mr-2">
      <Badge
        className={`z-10 self-end justify-center items-center ${cartItemsCount > 9 ? "h-5 w-5" : "h-4 w-4"} bg-red-600 rounded-full p-0 -mb-4 -mr-2 min-w-0`}
        variant="solid"
      >
        <BadgeText className={`${"text-white text-[10px] self-center font-bold leading-none "}`}>{cartItemsCount}</BadgeText>
      </Badge>
      <Button variant='link' >
        <ButtonText className="text-typography-800 ">
          <Icon className='' as={BaggageClaim} size='xl' />
        </ButtonText>
      </Button>
    </VStack>
  )
}

export default CartSection