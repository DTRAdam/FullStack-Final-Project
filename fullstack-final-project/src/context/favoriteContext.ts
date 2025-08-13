import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "../interfaces/products";

type FavProductContextValue = {
    favorites: Product[],
    setFavorites: Dispatch<SetStateAction<Product[]>>
};

export const FavProdContext = createContext<FavProductContextValue>({
    favorites: [],
    setFavorites: () => { },
});