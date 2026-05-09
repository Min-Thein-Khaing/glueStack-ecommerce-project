export interface ProductColor { 
    id: number;
    name: string;
    bgColor: string;
    stock: boolean;
}

export interface ProductSize {
    id: number;
    name: string;
    stock: boolean;
}
export interface ProductUser{
    id: number;
}
export interface ProductProps {
    id: number;
    categories_id: number;
    brand: string;
    title: string;
    star: number;
    quantity: number;
    price: number;
    discount: number;
    image: any;
    colors: ProductColor[];
    sizes: ProductSize[];
    users: ProductUser[];
    description: string;
} 