import { useEffect, useState } from "react";
import { Users } from "../interfaces/users";
import { getDecodedToken } from "../services/userServices";

const useUsers = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState<Users[]>([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = getDecodedToken(token);
                if (decoded) {
                    setIsLoggedIn(true);
                    setIsAdmin(decoded.isAdmin);
                    setUserId(decoded._id);
                }
            } catch (error) {
                localStorage.removeItem("token");
            }
        }
    }, []);

    return { isAdmin, userId, isLoggedIn, setIsLoggedIn, setUsers, users, setIsAdmin, setUserId };
}

export default useUsers;

