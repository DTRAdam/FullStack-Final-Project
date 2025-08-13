import { Product } from "./products";
export interface Users {
    _id?: string;
    name: {
        first: string;
        middle?: string;
        last: string
    };
    phone: string;
    email: string;
    password: string;
    image: {
        url?: string;
        alt?: string;
    }
    address: {
        country: string;
        state?: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    }
    isLoogedIn?: boolean
    isAdmin?: boolean,
}