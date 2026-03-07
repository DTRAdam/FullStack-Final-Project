import { useState, useEffect } from "react";
import { Product } from "../interfaces/products";
import { getProductsFromCart, deleteFromCart } from "../services/cartServcies";
import Swal from "sweetalert2";
import useUsers from "./useUsers";

export const useCart = () => {
    const { userId } = useUsers();
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setCartItems([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        getProductsFromCart(userId)
            .then((res: Product[]) => {

                setCartItems(res || [])
            })
            .catch((error) => {
                console.error(error);
                setCartItems([]);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const removeProductFromCart = async (productId: string, title?: string) => {
        const confirm = await Swal.fire({
            title: `Remove ${title || "this item"}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        });

        if (confirm.isConfirmed && userId) {
            try {

                await deleteFromCart(productId, userId);


                const res = await getProductsFromCart(userId);
                setCartItems(res || []);

                Swal.fire("Removed!", `${title || "Item"} removed.`, "success");
            } catch (error) {
                console.error(error);
                Swal.fire("Error!", "Could not remove item.", "error");
            }
        }
    };

    const refreshCart = async () => {
        if (!userId) return;
        try {
            const res = await getProductsFromCart(userId);
            setCartItems(res || []);
        } catch (err) {
            console.error(err);
            setCartItems([]);
        }
    };

    return { cartItems, loading, removeProductFromCart, refreshCart };
};