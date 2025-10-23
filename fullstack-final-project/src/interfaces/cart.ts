export interface Cart {
    _id?: string;
    userId: string;
    products: string[];
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}
