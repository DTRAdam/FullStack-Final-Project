import { createContext } from "react";

interface PaginationContextType {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    productsPerPage: number;
}


export const paginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider = paginationContext.Provider;