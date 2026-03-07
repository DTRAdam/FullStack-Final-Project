import { useEffect, useState, useContext } from "react";
import { Users } from "../interfaces/users";
import { getDecodedToken, getUserById, getAllUsers } from "../services/userServices";
import { authAdminContext, authContext } from "../context/isLoggedInContext";

const useUsers = () => {
    const [userProfile, setUserProfile] = useState<Users | null>(null);
    const [allUsers, setAllUsers] = useState<Users[]>([]);
    const [userId, setUserId] = useState("");
    const [loadingUser, setLoadingUser] = useState(true);
    const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
    const { isAdmin, setIsAdmin } = useContext(authAdminContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setLoadingUser(false);
            return;
        }
        try {
            const decoded = getDecodedToken(token);
            if (decoded) {
                setIsLoggedIn(true);
                setIsAdmin(decoded.isAdmin);
                setUserId(decoded._id);

                getUserById(decoded._id)
                    .then((res) => setUserProfile(res.data))
                    .catch((err) => console.error(err));

                if (decoded.isAdmin) {
                    getAllUsers()
                        .then((res) => setAllUsers(res.data))
                        .catch((err) => console.error(err));
                }
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            localStorage.removeItem("token");
        } finally {
            setLoadingUser(false);
        }
    }, [setIsLoggedIn, setIsAdmin]);


    return {
        isLoggedIn,
        isAdmin,
        userId,
        loadingUser,
        userProfile,
        allUsers,
        setIsLoggedIn,
        setIsAdmin,
        setAllUsers
    };
};

export default useUsers;