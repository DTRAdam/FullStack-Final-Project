import { useEffect, useState, useContext } from "react";
import { Users } from "../interfaces/users";
import { getDecodedToken, getUserById, getAllUsers } from "../services/userServices"; // מייבאים את כל הפונקציות הנדרשות
import { authContext } from "../context/isLoggedInContext";

const useUsers = () => {

    const [userProfile, setUserProfile] = useState<Users | null>(null);

    const [allUsers, setAllUsers] = useState<Users[]>([]);

    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState("");
    const [loadingUser, setLoadingUser] = useState(true);
    const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            setLoadingUser(false);
            return;
        }
        try {
            const decoded = getDecodedToken(token);
            if (decoded) {
                setIsLoggedIn(true);
                const isAdminStatus = decoded.isAdmin;
                const currentUserId = decoded._id;
                setIsLoggedIn(true)

                setIsAdmin(isAdminStatus);
                setUserId(currentUserId);

                getUserById(currentUserId)
                    .then((res) => {
                        setUserProfile(res.data);
                    })
                    .catch((err) => console.error("Failed to fetch user profile", err));

                if (isAdminStatus) {
                    getAllUsers()
                        .then((res) => {
                            setAllUsers(res.data);
                        })
                        .catch((err) => console.error("Failed to fetch all users", err));
                }

            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Token decoding or data fetching failed:", error);
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        } finally {
            setLoadingUser(false);
        }
    }, [setIsLoggedIn]);


    return {
        isLoggedIn, isAdmin, userId, loadingUser, userProfile, allUsers, setIsLoggedIn
    };
};

export default useUsers;