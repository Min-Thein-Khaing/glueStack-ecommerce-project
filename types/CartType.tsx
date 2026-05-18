export interface CartItem {
    id: number,
    color: string,
    size: string,
    quantity: number,
}

export interface CartProps {
    id:number,
    image:any,
    title:string,
    price:number,
    items:CartItem[],
}