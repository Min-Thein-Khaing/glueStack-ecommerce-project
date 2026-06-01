import { api } from "./index";

export const fetchCategories = async () => {
  try {
    console.log("fetch category");
    const res = await api.get("users/categories");
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to load categories");
  }
};


export const fetchProducts = async (limit: number, category: number, pageParam?: number) => {
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
        
