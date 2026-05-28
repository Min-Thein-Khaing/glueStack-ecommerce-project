import React, { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { Button, ButtonText } from '@/components/ui/button'

import { Minus, Plus, Trash, TrashIcon } from 'lucide-react-native'

import { Image } from 'expo-image'

import { Fab } from '@/components/ui/fab'

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Box } from '@/components/ui/box'
import { useCartStore } from '@/stores/useCartStore'

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Cart = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { carts, clearAllCart, updateCart, removeCart } = useCartStore()
  
  const totalPrice = carts.reduce((total, cart) => {
    return total + cart.items.reduce((itemTotal, item) => itemTotal + (cart.price * item.quantity), 0);
  }, 0);
  const handleClose = () => setShowAlertDialog(false);

  const handleRemoveAll = () => {
    clearAllCart()
    setShowAlertDialog(false)

  }
  

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* HEADER */}
      <HStack className="justify-center items-center py-4 border-b border-gray-200">
        <Text className="text-xl font-bold">
          Shopping Cart ({carts.length})
        </Text>
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false} className=''
      >
        {carts.length === 0 ? (
          <VStack className="justify-center items-center mt-20">
            <Text className="text-gray-500 text-base">
              No Items In Cart
            </Text>
          </VStack>
        ) : (
          carts.map((cart) => (
            <HStack
              key={cart.id}
              className="bg-white rounded-2xl p-3 mb-4  justify-between"
            >

              {/* LEFT */}
              <HStack className="gap-3 flex-1 mt-2 ">

                {/* IMAGE */}
                <VStack className="w-20 md:w-32">
                  <Image
                    source={cart.image}
                    placeholder={blurhash}
                    transition={1000}
                    style={{
                      width: "100%",
                      aspectRatio: 3 / 4,
                      borderRadius: 12,
                    }}
                    contentFit="cover"
                  />
                </VStack>

                {/* CONTENT */}
                <VStack className="flex-1 justify-between">

                  {/* TITLE */}
                  <VStack className="gap-1">
                    <Text className="font-bold text-sm leading-5">
                      {cart.title.length > 40
                        ? cart.title.slice(0, 40) + "..."
                        : cart.title}
                    </Text>

                    <Text className="text-green-600 font-bold text-base">
                      ${cart.price}
                    </Text>
                  </VStack>

                  {/* VARIANTS */}
                  <VStack className="gap-2 mt-2">
                    {cart.items.map((item, index) => (
                      
                      <HStack
                        key={index}
                        className="justify-between items-center bg-gray-100 px-2 py-1 rounded-md"
                      >
                        <Text className="text-xs font-medium text-gray-700 flex-1">
                          {item.color} - {item.size}
                        </Text>

                        <HStack className='flex-1 items-center justify-center'>
                          <Text className="text-xs font-bold">
                            x {item.quantity}
                          </Text>
                        </HStack>
                        <HStack className="items-center gap-2">

                          <Button
                            variant="outline"
                            size="xs"
                            className="rounded-full w-8 h-8"
                            onPress={() => item.quantity > 1 ? updateCart(cart.id, item.id, item.quantity - 1) : null}
                          >
                            <Icon as={Minus} size="xs" />
                          </Button>

                          <Text className='text-base'>{item.quantity}</Text>

                          <Button
                            variant="outline"
                            size="xs"
                            className="rounded-full w-8 h-8"
                            onPress={() => updateCart(cart.id, item.id, item.quantity + 1)}
                          >
                            <Icon as={Plus} size="xs" />
                          </Button>
                          <Button
                            onPress={() => removeCart(cart.id, item.id)}
                            size="xs"
                            variant="link"
                            className="p-0"
                          >
                            <Icon
                              as={Trash}
                              size="sm"
                              className="text-red-500"
                            />
                          </Button>

                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </HStack>

              {/* RIGHT */}

            </HStack>
          ))
        )}
      </ScrollView>

      {/* TOTAL */}
        {carts.length > 0 ? (
          <>
            <VStack className='bg-white  p-6 rounded-2xl  border mx-2 border-gray-100 shadow-md'>
              <HStack className='justify-between '>
                <Text className='text-gray-500'>Total</Text>
                <Text className='font-bold text-gray-900'>${totalPrice.toFixed(2)}</Text>
              </HStack>
              <Button className='my-3'>
                <Text className='text-white font-bold'>CheckOut</Text>
              </Button>
            </VStack>
            <Fab
              onPress={() => setShowAlertDialog(true)}
              size="sm"
              placement="bottom right"
              isHovered={false}
              isDisabled={false}
              isPressed={false}
              className='bg-transparent bg-gray-200 mb-32'
            >
              <Icon as={Trash} className='text-red-500' />
            </Fab>
          </>
        ) : null}
      
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} className='px-5'>
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[415px] gap-4 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader className="mb-2">
            <Text size="md">Delete account?</Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-center font-bold text-sm">
              The invoice will be deleted from the invoices section and in the
              documents folder. This cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">

            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
              className="px-[30px]"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={handleRemoveAll}
              size="sm"
              action="negative"
              className="px-[30px]"
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  )
}

export default Cart