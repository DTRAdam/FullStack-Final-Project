import { FunctionComponent } from "react";
import useCart from "../hooks/useCart";
import { Product } from "../interfaces/products";
import { Link } from "react-router-dom";

const CartC: FunctionComponent = () => {
    const { cartItems, loading, removeProductFromCart } = useCart();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="loader">
                    <div className="box1"></div>
                    <div className="box2"></div>
                    <div className="box3"></div>
                </div>
            </div>
        );
    }

    // This calculation is now simple because the data from the hook is clean.
    const subtotal = cartItems.reduce((total, product) => {
        return total + (product.price || 0) * (product.quantity || 1);
    }, 0);

    const handleCheckout = () => {
        // NOTE: Placeholder for your future checkout logic (e.g., navigate to a new page).
        alert("Proceeding to checkout with a total of $" + subtotal.toFixed(2));
    };

    return (
        <div className="container mt-4 mb-5" data-aos="fade-in">
            <h1 className="mb-4">Your Shopping Cart <i className="fa-solid fa-cart-shopping"></i></h1>

            {cartItems.length > 0 ? (

                <div className="row g-4">

                    <div className="col-lg-8">
                        {cartItems.map((product: Product) => (
                            <div className="card mb-3 shadow-sm" key={product._id}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            src={product.image?.url}
                                            alt={product.image?.alt || product.title}
                                            className="img-fluid rounded-start"
                                            style={{ objectFit: 'cover', height: '100%', minHeight: '120px' }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h5 className="card-title mb-1">{product.title}</h5>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeProductFromCart(product._id!, product.title)}
                                                    title="Remove from cart"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                            <p className="card-text text-muted mb-2">
                                                Price: ${(product.price || 0).toFixed(2)}
                                            </p>
                                            <p className="card-text">
                                                <strong>Quantity:</strong> {product.quantity || 1}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                            <div className="card-body">
                                <h5 className="card-title border-bottom pb-2 mb-3">Order Summary</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span>Subtotal</span>
                                        <strong>${subtotal.toFixed(2)}</strong>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span>Shipping</span>
                                        <strong className="text-success">FREE</strong>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-top pt-3 px-0">
                                        <h4>Total</h4>
                                        <h4><strong>${subtotal.toFixed(2)}</strong></h4>
                                    </li>
                                </ul>
                                <div className="d-grid mt-4">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleCheckout}
                                        disabled={cartItems.length === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (

                <div className="text-center py-5 my-5">
                    <div className="mb-4">
                        <i className="fa-solid fa-cart-arrow-down fa-5x text-muted"></i>
                    </div>
                    <h2 className="display-5">Your cart is empty</h2>
                    <p className="lead text-muted">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="btn btn-primary btn-lg mt-3">
                        <i className="fa-solid fa-store me-2"></i> Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartC;