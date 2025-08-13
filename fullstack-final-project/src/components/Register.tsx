import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Users } from "../interfaces/users";
import * as yup from "yup";
import { createUser } from "../services/userServices";
import { errorMsg, successMsg } from "../services/feedBack";
import { createCart } from "../services/cartServcies";
import useUsers from "../hooks/useUsers";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {
    const navigate: NavigateFunction = useNavigate();
    const { userId } = useUsers()
    const formik = useFormik<Users>({
        initialValues: {
            name: {
                first: "",
                middle: "",
                last: "",
            },
            phone: "",
            email: "",
            password: "",
            image: {
                url: "",
                alt: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
        },
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().min(2).max(256).required(),
                middle: yup.string().min(2).max(256),
                last: yup.string().min(2).max(256).required(),
            }),
            phone: yup.string().matches(/^\d{9,11}$/, "Phone must be a valid Israeli number").required(),
            email: yup.string().email().min(5).required(),
            password: yup.string().min(8).max(20).required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
            image: yup.object({
                url: yup.string().url().min(14),
                alt: yup.string().min(2).max(256),
            }),
            address: yup.object({
                state: yup.string().min(2).max(256),
                country: yup.string().min(2).max(256).required(),
                city: yup.string().min(2).max(256).required(),
                street: yup.string().min(2).max(256).required(),
                houseNumber: yup.number().min(1).required(),
                zip: yup.number().min(2),
            }),
        }),
        onSubmit: (values: Users) => {
            createUser(values).then((res) => {
                successMsg("Thank you for registering! Please log in.");
                createCart(userId)
                navigate("/login");
            }).catch((err) => {
                if (err.response) {
                    errorMsg(err.response.data);
                } else {
                    errorMsg("An unexpected error occurred. Please try again.");
                }
                console.log(err);
            });
        }
    });
    return (
        <div data-aos="fade-in"
            data-aos-offset="0">
            <h1 className="registerheader text-center">Sign Up</h1>
            <div className="container col-md-8">
                <form className="registerform" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="name.first"
                            name="name.first"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name.first}
                        />
                        <label htmlFor="name.first">First name</label>
                        {formik.touched.name?.first && formik.errors.name?.first && (
                            <p className="text-danger">{formik.errors.name.first}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="name.middle"
                            name="name.middle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name.middle}
                        />
                        <label htmlFor="name.middle">Middle name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="name.last"
                            name="name.last"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name.last}
                        />
                        <label htmlFor="name.last">Last name</label>
                        {formik.touched.name?.last && formik.errors.name?.last && (
                            <p className="text-danger">{formik.errors.name.last}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        <label htmlFor="phone">Phone</label>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-danger">{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <label htmlFor="password">Password <i className="fa-solid fa-key registericon"></i></label>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-danger">{formik.errors.password}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="url"
                            className="form-control"
                            id="image.url"
                            name="image.url"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.image.url}
                        />
                        <label htmlFor="image.url">Image url</label>
                        {formik.touched.image?.url && formik.errors.image?.url && (
                            <p className="text-danger">{formik.errors.image.url}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="address.country"
                            name="address.country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.country}
                        />
                        <label htmlFor="address.country">Country</label>
                        {formik.touched.address?.country && formik.errors.address?.country && (
                            <p className="text-danger">{formik.errors.address.country}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="address.city"
                            name="address.city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.city}
                        />
                        <label htmlFor="address.city">City</label>
                        {formik.touched.address?.city && formik.errors.address?.city && (
                            <p className="text-danger">{formik.errors.address.city}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="address.street"
                            name="address.street"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.street}
                        />
                        <label htmlFor="address.street">Street</label>
                        {formik.touched.address?.street && formik.errors.address?.street && (
                            <p className="text-danger">{formik.errors.address.street}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number"
                            className="form-control"
                            id="address.houseNumber"
                            name="address.houseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.houseNumber}
                        />
                        <label htmlFor="address.houseNumber">House number</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                            <p className="text-danger">{formik.errors.address.houseNumber}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number"
                            className="form-control"
                            id="address.zip"
                            name="address.zip"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.zip}
                        />
                        <label htmlFor="address.zip">ZIP number</label>
                        {formik.touched.address?.zip && formik.errors.address?.zip && (
                            <p className="text-danger">{formik.errors.address.zip}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;