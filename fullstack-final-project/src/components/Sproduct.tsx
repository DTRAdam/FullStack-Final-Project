import { FunctionComponent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { addToCart } from "../services/cartServcies";
import { errorMsg, successMsg } from "../services/feedBack";
import useUsers from "../hooks/useUsers";

const Sproduct: FunctionComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading } = useProducts();
    const { isLoggedIn } = useUsers();

    const product = products.find((p) => p._id === id);

    if (loading) return <div className="centered"><div className="blob-1"></div></div>;
    if (!product) return <div className="centered"><h3>Product Not Found</h3></div>;

    return (
        <div className="spcontainer container mt-5 mb-5">
            <button className="btn btn-outline-dark text-light mb-4" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i> Back to Products
            </button>

            <div className="row g-5">

                <div className="col-md-6" data-aos="fade-right">
                    <img
                        src={product.image.url}
                        alt={product.title}
                        className="img-fluid roundedshadow"
                        style={{ width: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: "15px" }}
                    />
                </div>

                <div className="col-md-6" data-aos="fade-left">
                    <h1 className="display-4 fs-2 fw-bold">{product.title}</h1>
                    <hr />
                    <h3 className="sprice mb-4">Price: {product.price}$</h3>

                    <h5 className="fw-bold">Description:</h5>
                    <p className="lead  text-light" style={{ lineHeight: "1.8" }}>
                        {product.description}
                    </p>

                    <div className="mt-5 d-flex gap-3">
                        {isLoggedIn && (
                            <button
                                className="btn btn-dark btn-lg px-5"
                                onClick={() => {
                                    addToCart(product._id!)
                                        .then(() => successMsg("Added to cart!"))
                                        .catch(() => errorMsg("Failed to add"));
                                }}
                            >
                                <i className="fa-solid fa-cart-plus me-2"></i> Add to Cart
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sproduct;