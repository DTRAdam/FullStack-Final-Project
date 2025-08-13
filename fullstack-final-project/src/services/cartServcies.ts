import axios from "axios"
import { getProductById } from "./productServices"

const api: string = `${process.env.REACT_APP_API}/carts`

export function createCart(userId: string) {
    return axios.post(api, { userId, products: [], active: true })
}

export async function getProductsFromCart() {
    try {
        let userId: string = JSON.parse(localStorage.getItem("userId") as string)
        let userCart = await axios.get(`${api}?userId=${userId}&&actove=true`)

        let productdetails = []
        for (let id of userCart.data[0].product) {
            productdetails.push(getProductById(id))
        }
        return Promise.all(productdetails)
    } catch (error) {
        console.log(error);
    }
}

export const getCart = (userId: string) => {
    return axios.get(`${api}/${userId}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const addToCart = async (productId: string, quantity = 1) => {
    try {
        const res = await axios.post(
            `${api}`,
            { productId, quantity },
            {
                headers: {

                    "x-auth-token": localStorage.getItem("token")
                }
            }
        );
        return res.data;
    } catch (err: any) {

        console.error("Error adding to cart:", err);
        if (err.response && err.response.data) {
            console.error("Backend response data:", err.response.data);
        }
        throw err;
    }
};



export const deleteFromCart = (productId: string) => {
    return axios.delete(`${api}/${productId}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};


