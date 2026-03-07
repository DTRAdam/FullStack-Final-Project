import axios from "axios";
import { Product } from "../interfaces/products";

const api: string = `${process.env.REACT_APP_API}/carts`;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { "x-auth-token": token } : {};
};


export function createCart(userId: string) {
    return axios.post(api, { userId, products: [], active: true }, { headers: getAuthHeaders() });
}


export async function getProductsFromCart(userId: string): Promise<Product[]> {
    try {
        const response = await axios.get(`${api}/${userId}`, { headers: getAuthHeaders() });
        const userCart: any = response.data.cart;

        if (!userCart || !userCart.products || userCart.products.length === 0) {
            return [];
        }


        // Prevent mapping errors from deleted products (where productId is null)
        const productDetails: Product[] = userCart.products
            .filter((item: any) => item.productId != null)
            .map((item: any) => {
                return {
                    _id: item.productId._id,
                    title: item.productId.title,
                    price: item.productId.price,
                    description: item.productId.description,
                    category: item.productId.category,
                    image: item.productId.image,
                    quantity: item.quantity
                };
            });

        return productDetails;
    } catch (error) {
        console.error("Error in getProductsFromCart:", error);
        throw error;
    }
}

export const addToCart = async (productId: string, quantity = 1) => {
    try {
        const res = await axios.post(api, { productId, quantity }, { headers: getAuthHeaders() });
        return res.data;
    } catch (err) {
        console.error("Error adding to cart:", err);
        throw err;
    }
};


export const deleteFromCart = async (productId: string, userId: string) => {
    try {
        const res = await axios.delete(`${api}/${userId}/${productId}`, { headers: getAuthHeaders() });
        return res.data;
    } catch (error) {
        console.error("Error deleting from cart:", error);
        throw error;
    }
};
