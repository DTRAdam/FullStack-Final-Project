export interface Product {
    _id?: string;
    title: string;
    price: number;
    description: string;
    inStock: boolean;
    categoryId?: number;
    category: string;
    image: {
        url: string;
        alt?: string
    };
    creationAt?: string;
    updatedAt?: string;
    quantity?: number;
}
