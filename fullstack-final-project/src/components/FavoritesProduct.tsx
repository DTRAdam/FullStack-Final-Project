import { FunctionComponent } from "react";
import { Product } from "../interfaces/products";
import useUsers from "../hooks/useUsers";
import { addToCart } from "../services/cartServcies";


interface FavoritesProductProps {
    favorites: Product[];
}

const FavoritesProduct: FunctionComponent<FavoritesProductProps> = ({ favorites }) => {
    const { isLoggedIn } = useUsers()
    return (
        <>
            <h1>Favorite Products</h1>
            <div className="Favmaindiv">

                {favorites.length ? (
                    favorites.map((product: Product) => (
                        <div className="wrapper" key={product._id}>
                            <div className="card">
                                <div className="back">
                                    <div className="backtext">
                                        <h1 className="card-title ">{product.title}</h1>
                                        <p className="card-text"> {product.description.length > 250
                                            ? `${product.description.substring(0, 250)}...`
                                            : product.description}</p>

                                    </div>
                                    {isLoggedIn && <div className="loggedibtns">
                                        <button onClick={() => { addToCart(product._id as string, product.quantity) }} className="btn text-light"><i className="fa-solid fs-2  fa-cart-plus"></i></button>
                                    </div>}
                                </div>
                                <div className="front">
                                    <div className="cardbodymaincontainer">
                                        <div className="card-body">
                                            <div
                                                className="card-img-top"
                                                style={{
                                                    backgroundImage: `url(${product.image.url})`,
                                                }}

                                            ></div>
                                            <h1 className="card-title ">{product.title}</h1>
                                            <h1 className="card-title ">{`Price: ${product.price} $`}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorite products have been selected.</p>
                )}
            </div>
        </>
    );
}

export default FavoritesProduct;