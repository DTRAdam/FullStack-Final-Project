import { useEffect, useState } from "react"
import { Product } from "../interfaces/products"
import { deleteProduct, getAllProducts } from "../services/productServices"
import Swal from "sweetalert2"

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setIsLoading] = useState(true)
    const [inStock, setInStock] = useState(true)
    const [favorites, setFavorites] = useState<Product[]>([])


    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites))
            } catch {
                console.error("Invalid favorites data in localStorage")
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])


    useEffect(() => {
        getAllProducts()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data)
                } else {
                    console.error("API did not return an array of products:", res.data);
                    setProducts([]);
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.error("Failed to fetch products:", err);
                setIsLoading(false)
            })
    }, [])

    const removeProduct = (productIdToRemove: string, productName: string) => {
        Swal.fire({
            title: `Remove ${productName} from the store?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(productIdToRemove)
                    .then(() => {
                        setProducts((prevItems) =>
                            prevItems.filter((item) => item._id !== productIdToRemove)
                        )
                        Swal.fire("Removed!", `${productName} has been removed`, "success")
                    })
                    .catch((error) => {
                        console.error("Error removing item:", error)
                        Swal.fire("Error!", "Could not remove item.", "error")
                    })
            }
        })
    }

    const handleFavoriteToggle = (product: Product) => {
        const isFavorite = favorites.some((fav) => fav._id === product._id)

        if (isFavorite) {
            Swal.fire("Removed!", "The product has been removed from your favorites.", "success")

            const newFavorites = (favorites: Product[]) => favorites.filter((fav: Product) => fav._id !== product._id)
            setFavorites(newFavorites)
        } else {
            Swal.fire("Added!", "The product has been added to your favorites.", "success")
            setFavorites([])
        }
    }

    return {
        products,
        setProducts,
        loading,
        inStock,
        removeProduct,
        handleFavoriteToggle,
        favorites,
        setFavorites,
    }
}

export default useProducts