import axios from "axios"
import { Product } from "../interfaces/products"

const api: string = `${process.env.REACT_APP_API}/products`
export function getAllProducts() {
    return axios.get(api)
}

export function getProductById(id: string) {
    return axios.get(`${api}/${id}`)
}

export function addProduct(product: Product) {
    return axios.post(api, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}

export function updateproduct(product: Product) {
    return axios.put(`${api}/${product._id}`, product, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}

export function likeUnlikeProduct(product: Product) {
    return axios.patch(`${api}/${product}`, {
        Headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}

export function deleteProduct(id: string) {
    return axios.delete(`${api}/${id}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}