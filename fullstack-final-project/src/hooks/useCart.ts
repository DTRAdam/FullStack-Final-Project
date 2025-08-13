import { useEffect, useState } from "react";
import { Product } from "../interfaces/products";
import { deleteFromCart, getCart } from "../services/cartServcies";
import Swal from "sweetalert2";
import useUsers from "./useUsers";

const useCart = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useUsers();

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");

        if (token) {
            setLoading(true);
            getCart(userId)
                .then((res) => {
                    setCartItems(res.data.products || []);
                })
                .catch((err) => {
                    console.error("Failed to fetch cart:", err);
                    setCartItems([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setCartItems([]);
            setLoading(false);
        }
    }, [userId]);





    const removeProductFromCart = (productId: string, productName: string) => {
        Swal.fire({
            title: `Remove ${productName} from cart?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFromCart(productId)
                    .then(() => {
                        setCartItems((prevItems) =>
                            prevItems.filter((item) => item._id !== productId)
                        );
                        Swal.fire("Removed!", `${productName} has been removed from your cart.`, "success");
                    })
                    .catch((error) => {
                        console.error("Error removing item from cart:", error);
                        Swal.fire("Error!", "Could not remove item from cart.", "error");
                    });
            }
        });
    };

    return { cartItems, loading, removeProductFromCart };
};

export default useCart;