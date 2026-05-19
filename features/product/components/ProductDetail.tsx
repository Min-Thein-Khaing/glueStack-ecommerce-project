import {
    Checkbox,
    CheckboxGroup,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@/components/ui/checkbox'
import { HStack } from '@/components/ui/hstack'
import { CheckIcon, Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ProductProps } from "@/types/ProductType"
import { Heart, Minus, Plus, Star, X } from "lucide-react-native"
import React, { useEffect, useState } from "react"

import { useAppToast } from "@/components/Toast"
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper
} from '@/components/ui/actionsheet'
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { useCartStore } from '@/stores/useCartStore'
import { CartItem } from '@/types/CartType'
import TapButton from '@/components/TapButton'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'




const ProductDetail = (product: ProductProps) => {
    const { brand, title, star, quantity, price, discount, image, users, sizes, colors, description , id} = product
    const [more, setMore] = useState(false)
    const [color, setColors] = React.useState<string[]>([]);
    const [size, setSizes] = React.useState<string[]>([]);
    const [cart, setCart] = useState<CartItem[]>([])

    const [showActionsheet, setShowActionsheet] = React.useState(false);
    const handleClose = () => setShowActionsheet(false);

    const { handleToast } = useAppToast()
    const [count, setCount] = useState(1)

    //multiple checkbox error fix 
    const [resetKey, setResetKey] = useState(0)

    //useCartStore
    const { addCart , clearAllCart} = useCartStore()
    //router 
    const router = useRouter()
    const handleSubmit = () => {

        if (quantity === 0) {
            return;
        }

        const newItems: CartItem[] = [];

        color.forEach((col) => {
            size.forEach((siz) => {
                newItems.push({
                    id: Math.random(),
                    size: siz,
                    color: col,
                    quantity: count,
                });
            });
        });

        setCart((prev) => [...newItems, ...prev]);
        handleClose()
        setResetKey((prev) => prev + 1)
        setColors([])
        setSizes([])
        setCount(1)
    };
    const handleAddToCart = ()=> {
        if(cart.length === 0) {
            handleToast({title: 'Please select color and size', description: 'error', successError: false})
            return

        }
        addCart({
            id ,
            title,
            price,
            image,
            items:cart
        })
        handleToast({title: 'Product added to cart', description: 'success', successError: true})
        setCart([])
        router.back()
    }


    const handleRemove = (id: number) => {
        setCart(cart => cart.filter((item) => item.id !== id))
    }
    

    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <VStack className="gap-1 my-4 mx-4">
            <HStack className="justify-between items-center">
                <HStack className="justify-start items-center gap-2">
                    <Text>{brand}</Text>
                    <Icon as={Star} className="text-yellow-500" size="sm" />
                    <Text className="">{star}</Text>
                    <Text className="">({quantity})</Text>
                </HStack>
                <Pressable className=" w-8 h-8 rounded-full items-center justify-center bg-[#00000015]">
                    <Icon
                        as={Heart}
                        className={`${users?.length > 0 ? "fill-red-500 stroke-none" : "text-red-500"}`}
                        size="lg"
                    />
                </Pressable>
            </HStack>
            <Text>{title}</Text>
            <HStack className="items-center gap-2">
                <Text className="text-lg font-bold text-green-600">${price && price.toFixed(2)}</Text>
                {discount > 0 && (
                    <Text className="text-sm font-medium text-red-500 line-through">${discount.toFixed(2)}</Text>
                )}
            </HStack>
            <VStack>
                <Text className={`${more ? "" : "line-clamp-2"}`}>{description}</Text>
                <Pressable onPress={() => setMore((prev) => !prev)}>
                    <Text className="text-blue-600 italic">{more ? "See less" : "Read more"}</Text>
                </Pressable>
            </VStack>
            <Text className="font-semibold text-lg mt-1 mb-2 tracking-widest">
                Choose Colors
            </Text>

            <CheckboxGroup
                key={`color-${resetKey}`}
                value={color}
                onChange={(keys) => {
                    setColors(keys)
                }}
            >
                <HStack space="2xl">
                    {colors
                        ?.filter((item) => item.stock === true)
                        .map((item) => (
                            <Checkbox key={item.id} value={item.name}>
                                <CheckboxIndicator>
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>

                                <CheckboxLabel className="font-bold text-gray-600">
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </CheckboxLabel>
                            </Checkbox>
                        ))}
                </HStack>
            </CheckboxGroup>

            <Text className="font-semibold text-lg mt-3 mb-2 tracking-widest">
                Choose Sizes
            </Text>

            <CheckboxGroup
                key={`size-${resetKey}`}
                value={size}
                onChange={(keys) => {
                    setSizes(keys);
                }}
                className="mb-2"
            >
                <HStack space="2xl" className="justify-start items-center">
                    {sizes
                        ?.filter((item) => item.stock === true)
                        .map((item) => (
                            <Checkbox key={item.id} value={item.name}>
                                <CheckboxIndicator>
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>

                                <CheckboxLabel className="font-bold text-gray-600">
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </CheckboxLabel>
                            </Checkbox>
                        ))}
                </HStack>
            </CheckboxGroup >
            <Button
                className="bg-sky-500 self-start mt-2 rounded-md"
                onPress={() => {

                    if (color.length > 0 && size.length > 0) {
                        setShowActionsheet(true);
                        return;
                    }

                    const title = `Please Select ${color.length === 0 ? `${size.length > 0 ? "Color " : "Color -"}` : ""
                        } ${size.length === 0 ? "Size" : ""
                        }`;

                    const description =
                        "Please select before choosing quantity";

                    handleToast({
                        title,
                        description,
                        successError: false
                    });
                }}
            >
                <ButtonText>
                    Set Quantity
                </ButtonText>
                
            </Button>
            
            <>
            {cart.length > 0 && (
                <VStack className=' w-full '>
                    <Text className='text-xl font-bold mt-5'>Total Price ${cart.reduce((acc, item) => acc +price * item.quantity, 0).toFixed(2)}</Text>
                    {cart.map((c) => (
                        <HStack key={c.id} className='bg-gray-200 my-2 rounded-md p-2 items-center justify-between'>
                            <HStack className="gap-2 items-center">
                                <Icon as={Plus} />
                                <Text>{c.color} - {c.size} </Text>
                                <Text>({c.quantity})</Text>
                                <Text className="font-semibold">${(price * c.quantity).toFixed(2)}</Text>

                            </HStack>
                            <Button onPress={() => handleRemove(c.id)} variant='link' className='border border-gray-300 p-3 bg-gray-200 rounded-full'>
                                <ButtonIcon as={X} size="sm" color='black' />
                            </Button>
                        </HStack>
                    ))}
                </VStack>
            )}
            </>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <VStack className='my-2'>
                        <VStack>
                            <Text className='font-bold text-lg mx-auto'>You chose colors and sizes</Text>
                            <VStack>
                                <HStack className='items-center justify-center mb-5'>
                                    <Text className='text-gray-500'>
                                        {color.join(', ')} -
                                        {size.join(', ')}
                                    </Text>
                                </HStack>

                                <VStack className='gap-2 mb-5'>
                                    <Text className="text-lg font-semibold mx-auto">Please Set Quantity</Text>
                                    <Text className="text-2xl font-bold mx-auto">{count}</Text>
                                </VStack>
                                <VStack className='gap-2'>
                                    <HStack className='items-center justify-center gap-5'>

                                        <Button className=' bg-sky-500 ' onPress={() => setCount((prev) => prev > 1 ? prev - 1 : prev)}>
                                            <ButtonText>Decrease</ButtonText>
                                            <ButtonIcon as={Minus} />
                                        </Button>
                                        <Button className=' bg-sky-500 ' onPress={() => setCount((prev) => prev + 1)}>
                                            <ButtonText>Increase</ButtonText>
                                            <ButtonIcon as={Plus} />
                                        </Button>
                                    </HStack>
                                    <Button className='bg-green-600' onPress={handleSubmit}>
                                        <ButtonText>Confirm</ButtonText>
                                    </Button>
                                    <Button onPress={handleClose} className='bg-gray-600'>
                                        <ButtonText>Close</ButtonText>
                                    </Button>
                                </VStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </ActionsheetContent>
            </Actionsheet>

        </VStack>
        </ScrollView>
        <TapButton handleClick={handleAddToCart} />
        </>
    )
}

export default ProductDetail

//single radio 


// const ProductDetail = (product: ProductProps) => {
//   const {
//     brand,
//     title,
//     star,
//     quantity,
//     price,
//     discount,
//     users,
//     sizes,
//     colors,
//     description,
//   } = product;

//   const { handleToast } = useAppToast();

//   const [more, setMore] = useState(false);

//   // SINGLE SELECT
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");

//   const [cart, setCart] = useState<CartProp[]>([]);

//   const [count, setCount] = useState(1);

//   const [showActionsheet, setShowActionsheet] =
//     useState(false);

//   const handleClose = () => setShowActionsheet(false);

//   const handleSubmit = () => {
//     if (!color || !size) return;

//     const newItem: CartProp = {
//       id: Math.random(),
//       color,
//       size,
//       quantity: count,
//     };

//     setCart((prev) => [newItem, ...prev]);

//     // RESET
//     setColor("");
//     setSize("");
//     setCount(1);

//     setShowActionsheet(false);
//   };

//   const handleRemove = (id: number) => {
//     setCart((prev) =>
//       prev.filter((item) => item.id !== id)
//     );
//   };

//   return (
//     <VStack className="gap-1 my-4 mx-4">
//       {/* TOP */}
//       <HStack className="justify-between items-center">
//         <HStack className="justify-start items-center gap-2">
//           <Text>{brand}</Text>

//           <Icon
//             as={Star}
//             className="text-yellow-500"
//             size="sm"
//           />

//           <Text>{star}</Text>

//           <Text>({quantity})</Text>
//         </HStack>

//         <Pressable className="w-8 h-8 rounded-full items-center justify-center bg-[#00000015]">
//           <Icon
//             as={Heart}
//             className={`${
//               users?.length > 0
//                 ? "fill-red-500 stroke-none"
//                 : "text-red-500"
//             }`}
//             size="lg"
//           />
//         </Pressable>
//       </HStack>

//       {/* TITLE */}
//       <Text>{title}</Text>

//       {/* PRICE */}
//       <HStack className="items-center gap-2">
//         <Text className="text-lg font-bold text-green-600">
//           ${price && price.toFixed(2)}
//         </Text>

//         {discount > 0 && (
//           <Text className="text-sm font-medium text-red-500 line-through">
//             ${discount.toFixed(2)}
//           </Text>
//         )}
//       </HStack>

//       {/* DESCRIPTION */}
//       <VStack>
//         <Text className={`${more ? "" : "line-clamp-2"}`}>
//           {description}
//         </Text>

//         <Pressable
//           onPress={() => setMore((prev) => !prev)}
//         >
//           <Text className="text-blue-600 italic">
//             {more ? "See less" : "Read more"}
//           </Text>
//         </Pressable>
//       </VStack>

//       {/* COLORS */}
//       <Text className="font-semibold text-lg mt-1 mb-2 tracking-widest">
//         Choose Colors
//       </Text>

//       <HStack className="gap-5 flex-wrap">
//         {colors
//           ?.filter((item) => item.stock === true)
//           .map((item) => {
//             const active = color === item.name;

//             return (
//               <Pressable
//                 key={item.id}
//                 onPress={() => setColor(item.name)}
//                 className={`border rounded-md px-3 py-2 ${
//                   active
//                     ? "bg-black border-black"
//                     : "bg-white border-gray-300"
//                 }`}
//               >
//                 <Text
//                   className={`font-bold ${
//                     active
//                       ? "text-white"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {item.name
//                     .charAt(0)
//                     .toUpperCase() +
//                     item.name.slice(1)}
//                 </Text>
//               </Pressable>
//             );
//           })}
//       </HStack>

//       {/* SIZES */}
//       <Text className="font-semibold text-lg mt-3 mb-2 tracking-widest">
//         Choose Sizes
//       </Text>

//       <HStack className="gap-5 flex-wrap">
//         {sizes
//           ?.filter((item) => item.stock === true)
//           .map((item) => {
//             const active = size === item.name;

//             return (
//               <Pressable
//                 key={item.id}
//                 onPress={() => setSize(item.name)}
//                 className={`border rounded-md px-4 py-2 ${
//                   active
//                     ? "bg-black border-black"
//                     : "bg-white border-gray-300"
//                 }`}
//               >
//                 <Text
//                   className={`font-bold ${
//                     active
//                       ? "text-white"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {item.name.toUpperCase()}
//                 </Text>
//               </Pressable>
//             );
//           })}
//       </HStack>

//       {/* BUTTON */}
//       <Button
//         className="bg-sky-500 self-start mt-4 rounded-md"
//         onPress={() => {
//           if (color && size) {
//             setShowActionsheet(true);
//             return;
//           }

//           const title = `Please Select ${
//             !color && size
//               ? "Color"
//               : color && !size
//               ? "Size"
//               : "Color - Size"
//           }`;

//           handleToast({
//             title,
//             description:
//               "Please select before choosing quantity",
//           });
//         }}
//       >
//         <ButtonText>Set Quantity</ButtonText>
//       </Button>

//       {/* CART */}
//       {cart.length > 0 && (
//         <VStack className="w-full mt-3">
//           {cart.map((c) => (
//             <HStack
//               key={c.id}
//               className="bg-gray-200 my-2 rounded-md p-3 items-center justify-between"
//             >
//               <HStack className="gap-2 items-center">
//                 <Icon as={Plus} />

//                 <Text>
//                   {c.color} - {c.size}
//                 </Text>

//                 <Text>({c.quantity})</Text>
//               </HStack>

//               <Button
//                 onPress={() => handleRemove(c.id)}
//                 variant="link"
//                 className="border border-gray-300 p-3 bg-gray-200 rounded-full"
//               >
//                 <ButtonIcon
//                   as={X}
//                   size="sm"
//                   color="black"
//                 />
//               </Button>
//             </HStack>
//           ))}
//         </VStack>
//       )}

//       {/* ACTION SHEET */}
//       <Actionsheet
//         isOpen={showActionsheet}
//         onClose={handleClose}
//       >
//         <ActionsheetBackdrop />

//         <ActionsheetContent>
//           <ActionsheetDragIndicatorWrapper>
//             <ActionsheetDragIndicator />
//           </ActionsheetDragIndicatorWrapper>

//           <VStack className="my-2 w-full px-4">
//             <Text className="font-bold text-lg mx-auto">
//               You chose:
//             </Text>

//             <Text className="text-gray-500 mx-auto mt-2 mb-5">
//               {color} - {size}
//             </Text>

//             <VStack className="gap-2 mb-5">
//               <Text className="text-lg font-semibold mx-auto">
//                 Please Set Quantity
//               </Text>

//               <Text className="text-2xl font-bold mx-auto">
//                 {count}
//               </Text>
//             </VStack>

//             <HStack className="items-center justify-center gap-5 mb-5">
//               <Button
//                 className="bg-sky-500"
//                 onPress={() =>
//                   setCount((prev) =>
//                     prev > 1 ? prev - 1 : prev
//                   )
//                 }
//               >
//                 <ButtonText>Decrease</ButtonText>

//                 <ButtonIcon as={Minus} />
//               </Button>

//               <Button
//                 className="bg-sky-500"
//                 onPress={() =>
//                   setCount((prev) => prev + 1)
//                 }
//               >
//                 <ButtonText>Increase</ButtonText>

//                 <ButtonIcon as={Plus} />
//               </Button>
//             </HStack>

//             <Button
//               className="bg-green-600 mb-3"
//               onPress={handleSubmit}
//             >
//               <ButtonText>Confirm</ButtonText>
//             </Button>

//             <Button
//               onPress={handleClose}
//               className="bg-gray-600"
//             >
//               <ButtonText>Close</ButtonText>
//             </Button>
//           </VStack>
//         </ActionsheetContent>
//       </Actionsheet>
//     </VStack>
//   );
// };
