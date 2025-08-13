import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/products";
import { getProductById, updateproduct } from "../services/productServices";
import { successMsg } from "../services/feedBack";
import * as yup from "yup"

interface EditProductProps {
    productId: string,
    onHide: Function
    refresh: Function
}

const EditProduct: FunctionComponent<EditProductProps> = ({ onHide, refresh, productId }) => {
    const [product, setProduct] = useState<Product>({
        title: "",
        description: "",
        image: {
            url: "",
            alt: "",
        },
        price: 0,
        inStock: false,
        categoryId: 0,
        category: {
            id: undefined,
            name: ""
        }
    })
    useEffect(() => {
        getProductById(productId)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const formik: FormikValues = useFormik<Product>({
        initialValues: product,
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required().min(2).max(256),
            description: yup.string().required().min(2).max(1024),
            price: yup.number().required().min(1),
            image: yup.object({
                url: yup.string().min(14).url().required(),
                alt: yup.string().min(2).max(256).required(),
            }),
        }),
        onSubmit: (values) => {
            updateproduct(values).then(() => {
                successMsg("Product updated successfully")
                onHide()
                refresh()
            }).catch((err) => console.log(err)
            )
        },
    })



    return (
        <>
            <div className="container w-75">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="title">Name: </label>
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="description">Description: </label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="price">Price: </label>
                        {formik.touched.price && formik.errors.price && (
                            <p className="text-danger">{formik.errors.price}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="image.url"
                            name="image.url"
                            value={formik.values.image.url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="image.url">Url: </label>
                        {formik.touched.image.url && formik.errors.image.url && (
                            <p className="text-danger">{formik.errors.image.url}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="image.alt"
                            name="image.alt"
                            value={formik.values.image.alt}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="image.alt">Alt: </label>
                        {formik.touched.image.alt && formik.errors.image.alt && (
                            <p className="text-danger">{formik.errors.image.alt}</p>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProduct;