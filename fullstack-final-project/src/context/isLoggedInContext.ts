import { createContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}


export const authContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});


interface AuthAdminContextType {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
}


export const authAdminContext = createContext<AuthAdminContextType>({
    isAdmin: false,
    setIsAdmin: () => { }
});


export const AuthProvider = authContext.Provider;
