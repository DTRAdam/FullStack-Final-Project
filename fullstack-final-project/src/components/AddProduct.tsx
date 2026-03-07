import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { Product } from "../interfaces/products";
import { addProduct } from "../services/productServices";
import { successMsg } from "../services/feedBack";

interface AddProductProps {
    onHide: Function;
    refresh: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({ onHide, refresh }) => {
    const formik = useFormik<Product>({
        initialValues: {
            title: "",
            price: 0,
            description: "",
            inStock: false,
            category: "",
            image: {
                url: "",
                alt: "",
            },
            quantity: 0,
        },

        validationSchema: yup.object({
            title: yup.string().required("Title is required").min(2).max(256),
            price: yup.number().required("Price is required").min(2, "Minimum price is 2"),
            description: yup.string().required("Description is required").min(2).max(256),
            category: yup.string().required("Category is required").min(2).max(256),
            quantity: yup.number().required("Quantity is required"),
            inStock: yup.boolean(),
            image: yup.object({
                url: yup.string().required(),
                alt: yup.string().min(2).max(256),
            }),
        }),
        onSubmit: (values) => {
            addProduct(values).then(() => {
                onHide()
                refresh()
                successMsg("product was added")
            }).catch((err) => console.log(err)
            )
        },

    })

    const getInputClass = (name: string) => {
        const meta = formik.getFieldMeta(name);
        if (meta.touched && meta.error) return "form-control is-invalid";
        if (meta.touched && !meta.error) return "form-control is-valid";
        return "form-control";
    };

    return (
        <div className="container w-100">
            <form className="addmodalform" onSubmit={formik.handleSubmit}>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className={getInputClass("title")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    <label htmlFor="title">Title</label>
                    {formik.touched.title && formik.errors.title && (
                        <p className="text-danger">{formik.errors.title}</p>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className={getInputClass("price")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    <label htmlFor="price">Price</label>
                    {formik.touched.price && formik.errors.price && (
                        <p className="text-danger">{formik.errors.price}</p>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className={getInputClass("quantity")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                    />
                    <label htmlFor="quantity">Quantity</label>
                    {formik.touched.quantity && formik.errors.quantity && (
                        <p className="text-danger">{formik.errors.quantity}</p>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className={getInputClass("description")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    <label htmlFor="description">Description</label>
                    {formik.touched.description && formik.errors.description && (
                        <p className="text-danger">{formik.errors.description}</p>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className={getInputClass("category")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    />
                    <label htmlFor="category">Category</label>
                    {formik.touched.category && formik.errors.category && (
                        <p className="text-danger">{formik.errors.category}</p>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="image.url"
                        id="image.url"
                        className={getInputClass("image.url")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image.url}
                    />
                    <label htmlFor="image.url">Image URL</label>
                    {formik.touched.image?.url && formik.errors.image?.url && (
                        <p className="text-danger">{formik.errors.image?.url}</p>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="image.alt"
                        id="image.alt"
                        className={getInputClass("image.alt")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image.alt}
                    />
                    <label htmlFor="image.alt">Image Alt</label>
                    {formik.touched.image?.alt && formik.errors.image?.alt && (
                        <p className="text-danger">{formik.errors.image?.alt}</p>
                    )}
                </div>

                <div className="form-check mb-3 mx-2"> <input type="checkbox" className="form-check-input" id="inStock" name="inStock" onChange={formik.handleChange} checked={formik.values.inStock} /> <label className="form-check-label text-light" htmlFor="inStock"> In Stock </label> </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 fs-5"
                    disabled={!formik.isValid || !formik.dirty}
                >
                    <i className="fa-solid fa-plus"></i> Add
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
