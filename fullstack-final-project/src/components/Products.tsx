import { FunctionComponent, useState } from "react";
import useProducts from "../hooks/useProducts";
import { Product } from "../interfaces/products";
import Pagination from "./Pagination";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import EditProductModal from "./EditProductModal";
import { addToCart } from "../services/cartServcies";
import { errorMsg, successMsg } from "../services/feedBack";
import AddProductModal from "./AddProductModal";
import { refresh } from "aos";

interface ProductsProps {
    handleFavoriteToggle: (product: Product) => void;
}

const Products: FunctionComponent<ProductsProps> = ({ handleFavoriteToggle }) => {
    const { products, loading, removeProduct } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin } = useUsers();
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false)
    const [productId, setProductId] = useState<string>("");
    const isLastPage = currentPage === totalPages || products.length === 0;

    return (
        <>
            <h1 className="section-title">Products <i className="fa-solid fa-tag"></i></h1>

            <div className="productmaindiv">
                {loading ? (
                    <div className="centered">
                        <div className="blob-1"></div>
                        <div className="blob-2"></div>
                    </div>
                ) : (
                    <div className="productcontainer">
                        <div className="productsgrid">
                            {currentProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="three-d-card"
                                    data-aos="fade-in"
                                    data-aos-offset="0"
                                >
                                    <div className="wrapper">
                                        <div className="card">
                                            <div className="back">
                                                <div className="backtext">
                                                    <h1 className="card-title">{product.title}</h1>
                                                    <p className="card-text">
                                                        {product.description.length > 200
                                                            ? `${product.description.substring(0, 200)}...`
                                                            : product.description}
                                                    </p>
                                                </div>
                                                <div className="productbtns">
                                                    {isAdmin && (
                                                        <div className="adminbtn">
                                                            <button onClick={() => removeProduct(product._id!, product.title)} className="btn text-light">
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                            <button onClick={() => {
                                                                setProductId(product._id!);
                                                                setOpenEditModal(true);
                                                            }} className="btn text-light">
                                                                <i className="fa-solid fa-pen"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                    {isLoggedIn && (
                                                        <div className="loggedibtns">
                                                            <button onClick={() => handleFavoriteToggle(product)} className="btn text-light">
                                                                <i className="fa-solid fa-heart"></i>
                                                            </button>
                                                            <button onClick={() => navigate(`/sproduct/${product._id}`)} className="btn text-light">
                                                                <i className="fa-solid fa-circle-info"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    addToCart(product._id!)
                                                                        .then(() => successMsg("Added to cart"))
                                                                        .catch(() => errorMsg("Failed"));
                                                                }}
                                                                className="btn text-light"
                                                            >
                                                                <i className="fa-solid fa-cart-plus"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="front">
                                                <div className="cardbodymaincontainer">
                                                    <div className="card-body">
                                                        <div
                                                            className="card-img-top"
                                                            style={{ backgroundImage: `url(${product.image.url})` }}
                                                        ></div>
                                                        <h1 className="card-title">{product.title}</h1>
                                                        <h1 className="card-title">Price: {product.price} $</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isAdmin && isLastPage && (
                                <div
                                    className="three-d-card add-card-special"
                                    data-aos="zoom-in"
                                    onClick={() => setOpenAddModal(true)}
                                >
                                    <div className="wrapper">
                                        <div className="card" style={{ border: '3px dashed #6c757d', background: 'transparent' }}>
                                            <div className="card-body d-flex flex-column align-items-center justify-content-center text-secondary">
                                                <i className="fa-solid fa-square-plus fa-4x mb-3"></i>
                                                <h2 className="fw-bold">ADD NEW</h2>
                                                <p>Create a product</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {products.length === 0 && !isAdmin && <p className="text-center">No products found</p>}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            <EditProductModal
                show={openEditModal}
                onHide={() => setOpenEditModal(false)}
                refresh={() => window.location.reload()}
                productId={productId}
            />
            <AddProductModal
                show={openAddModal}
                onHide={() => { setOpenAddModal(false) }}
                refresh={refresh} />
        </>
    );
};

export default Products;