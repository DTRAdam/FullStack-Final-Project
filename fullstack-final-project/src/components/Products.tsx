import { FunctionComponent, useState } from "react";
import useProducts from "../hooks/useProducts";
import { Product } from "../interfaces/products";
import Pagination from "./Pagination";
import useUsers from "../hooks/useUsers";
import { NavigateFunction, useNavigate } from "react-router-dom";
import EditProductModal from "./EditProductModal";
import { addToCart } from "../services/cartServcies";
import { errorMsg, successMsg } from "../services/feedBack";

interface ProductsProps {
    handleFavoriteToggle: (product: Product) => void;
}

const Products: FunctionComponent<ProductsProps> = ({ handleFavoriteToggle }) => {
    const { products, loading } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    const navigate: NavigateFunction = useNavigate();
    const { isLoggedIn, isAdmin } = useUsers();
    const [productsChanged, setProductsChanged] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>("");
    const { removeProduct, } = useProducts();




    let refresh = () => {
        setProductsChanged(!productsChanged);
    };

    return (
        <>
            <h1 className="section-title ">Products <i className="fa-solid fa-tag"></i></h1>
            <div className="productmaindiv">
                {loading ? (
                    <div className="loader">
                        <div className="box1"></div>
                        <div className="box2"></div>
                        <div className="box3"></div>
                    </div>
                ) : (
                    <div className="productcontainer">
                        {products.length ? (
                            <div className="productsgrid">
                                {currentProducts.map((product: Product) => (
                                    <div
                                        data-aos="fade-in"
                                        data-aos-offset="0"
                                        className="three-d-card"
                                        key={product._id}
                                    >
                                        <div className="wrapper" >
                                            <div className="card">
                                                <div className="back">
                                                    <div className="backtext">
                                                        <h1 className="card-title ">{product.title}</h1>
                                                        <p className="card-text"> {product.description.length > 250
                                                            ? `${product.description.substring(0, 250)}...`
                                                            : product.description}</p>
                                                    </div>
                                                    <div className="productbtns">
                                                        {isAdmin && <div className="adminbtn" style={{ visibility: isAdmin ? "visible" : "hidden" }}>
                                                            <button onClick={() => removeProduct(product._id!, product.title)} className="btn text-light"><i className="fa-solid fa-trash"></i></button>
                                                            <button onClick={() => {
                                                                setOpenEditModal(true);
                                                                setProductId(productId);
                                                            }} className="btn text-light"><i className="fa-solid fa-pen"></i></button>
                                                        </div>}
                                                        {isLoggedIn && <div className="loggedibtns">

                                                            <button onClick={() => {
                                                                handleFavoriteToggle(product)
                                                            }} className="btn text-light"><i className="fa-solid fa-heart"></i></button>
                                                            <button onClick={() => { navigate("/") }} className="btn text-light"><i className="fa-solid fa-circle-info"></i></button>
                                                            <button
                                                                onClick={() => {
                                                                    addToCart(product._id!)
                                                                        .then(() => {
                                                                            successMsg("Product Added to cart")
                                                                        })
                                                                        .catch(err => {
                                                                            console.error("addToCart error", err);
                                                                            errorMsg("Failed to add product")
                                                                        });
                                                                }}
                                                                className="btn text-light"
                                                            >
                                                                <i className="fa-solid fa-cart-plus"></i>
                                                            </button>
                                                        </div>}
                                                    </div>
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
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No products found</p>
                        )}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(products.length / productsPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </div >
                )}
            </div >
            <EditProductModal
                show={openEditModal}
                onHide={() => setOpenEditModal(false)}
                refresh={refresh}
                productId={productId} />
        </>
    );
};

export default Products;