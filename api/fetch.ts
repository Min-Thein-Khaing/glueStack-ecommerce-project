import { ProductProps } from "@/types/ProductType";
import { api } from "./index";

export const fetchCategories = async () => {
  try {
    console.log("fetch category");
    const res = await api.get("users/categories");
    //  await new Promise((resolve)=> setTimeout(resolve,3000))

    return res.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to load categories");
  }
};


export const fetchProducts = async (limit: number, category: number | null, pageParam?: number) => {
    try {
        console.log("fetch product",category , pageParam)
        const url = pageParam
          ? `users/products?limit=${limit}&category=${category}&cursor=${pageParam}`
          : `users/products?limit=${limit}&category=${category}`
        const res = await api.get(url);
        // await new Promise((resolve)=> setTimeout(resolve,3000))
        return res.data;
    } catch (error: any) {
        console.log("Fetch error:", error?.message)
        throw new Error(error?.message || "Failed to load products");
    }
}

export const fetchToggleProductFavourite = async ({productId,favourite}:{productId:number,favourite:boolean}) => {
    try {
        const res = await api.patch(`users/products/favourite-toggle`,{
          productId,favourite
        })
        // await new Promise((resolve)=> setTimeout(resolve,3000))
        return res.data;
    } catch (error: any) {
        console.log("Fetch error:", error?.message)
        throw new Error(error?.message || "Failed to toggle product favourite");
    }
}
export const fetchProductDetail = async (productId:number):Promise<ProductProps> => {
  try {
    console.log("fetch product detail", productId)
    const res = await api.get(`users/products/${productId}`);
    return res.data;
  } catch (error: any) {
    console.log("Fetch error:", error?.message);
    throw new Error(error?.message || "Failed to load product detail");
  }
}