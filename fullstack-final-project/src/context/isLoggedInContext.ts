import { createContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}


export const authContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});

export const AuthProvider = authContext.Provider;
