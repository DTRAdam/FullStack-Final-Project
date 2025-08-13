export interface Product {
    _id?: string;
    title: string;
    price: number;
    description: string;
    inStock: boolean;
    categoryId: number;
    category: {
        id?: string;
        name: string;
    };
    image: {
        url: string;
        alt?: string
    };
    creationAt?: string;
    updatedAt?: string;
    quantity?: number;

    // add later 
    // brand: string;
    // rating?: number;
}