import { CartItem, CartProps } from "@/types/CartType";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CartAction = {
    carts: CartProps[],

    addCart: (item: CartProps) => void,
    updateCart: (cardId: number, itemId: number, quantity: number) => void,
    clearAllCart: () => void,
    removeCart: (cardId: number, itemId: number) => void,
    getTotalItems: () => number
    getTotalPrice: () => number
}


export const useCartStore = create<CartAction>()(
    immer((set, get) => ({
        carts: [],

        addCart: (item: CartProps) => {
            set((state) => {
                const existCarts = state.carts.find((carts: CartProps) => carts.id === item.id)
                if (existCarts) {
                    item.items.forEach((cartItem: CartItem) => {
                        const existItem = existCarts?.items.find(
                            (item: CartItem) => item.color === cartItem.color && item.size === cartItem.size
                        )
                        if (existItem) {
                            existItem.quantity += cartItem.quantity;
                        } else {
                            existCarts?.items.push(cartItem)
                        }
                    })
                } else {
                    state.carts.push(item)
                }
            })
        },

        clearAllCart: () => {
            set((state) => {
                state.carts = []
            })
        },

        removeCart: (cardId, itemId) => {
            set(state => {
                const cartItemExist = state.carts.find((cart) => cart.id === cardId)
                if (cartItemExist) {
                    cartItemExist.items = cartItemExist.items.filter((items) => items.id !== itemId)
                }
                if(cartItemExist?.items.length === 0){
                    state.carts = state.carts.filter((cart) => cart.id !== cardId)
                }
            })
        },
        updateCart: (cardId: number, itemId: number, quantity: number) => {
            set(state => {
                const cart = state.carts.find((c) => c.id === cardId)
                if(cart){
                    const item = cart.items.find((i) => i.id === itemId)
                    if(item){
                        item.quantity = quantity
                    }
                }
            })
        },
        getTotalItems: () => {
            return get().carts.reduce((total, cart) => {
                return total + cart.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0);
            }, 0);
        },

        getTotalPrice: () => {
            const {carts} = get()
            return carts.reduce((total, cart) => {
                return total + cart.items.reduce((itemTotal, item) => itemTotal + (cart.price * item.quantity), 0);
            }, 0);
        }


    }))
);


