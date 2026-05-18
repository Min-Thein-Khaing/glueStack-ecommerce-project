import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'expo-router'
import { ShoppingCart } from 'lucide-react-native'
import React from 'react'
import { Badge, BadgeText } from './ui/badge'
import { Icon } from './ui/icon'
import { Pressable } from './ui/pressable'
import { VStack } from './ui/vstack'

const CartSection = () => {
  const router = useRouter()
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <Pressable onPress={() => router.push('/cart')} className='items-center justify-center  p-2  '>
      {/* အပြင်က wrapper ကို relative ပေးထားပါ */}
      <VStack className="relative items-center justify-center p-1 ">

        {totalItems > -1 && (
          <Badge
            // 💡 နေရာချထားမှုကို တိုက်ရိုက် React Native inline style သုံးပြီး ခိုင်းစေလိုက်ပါတယ်
            style={{
              position: 'absolute',
              top: -6,      // 🕹️ အပေါ်တိုးချင်ရင် အနှုတ်ပိုတိုးပေးပါ (ဥပမာ: -10)
              right: -8,    // 🕹️ ညာဘက်တိုးချင်ရင် အနှုတ်ပိုတိုးပေးပါ (ဥပမာ: -12)
              zIndex: 20,
              paddingHorizontal:2
            }}
            className={`justify-center items-center  bg-red-600 rounded-full p-0 min-w-0
              ${totalItems > 9 ? "h-5 w-5" : "h-4 w-4"}`}
            variant="solid"
          >
            <BadgeText className="text-white text-[10px] font-bold leading-none text-center">
              {totalItems}
            </BadgeText>
          </Badge>
        )}

        <Icon className='text-typography-800' as={ShoppingCart} size='xl' />
      </VStack>
    </Pressable>
  )
}

export default CartSection