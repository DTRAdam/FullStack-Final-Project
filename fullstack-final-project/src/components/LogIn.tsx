import { FunctionComponent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import useUsers from "../hooks/useUsers";
import { FormikValues, useFormik } from "formik";
import { checkUser } from "../services/userServices";
import { errorMsg, successMsg } from "../services/feedBack";

interface LogInProps {

}

const LogIn: FunctionComponent<LogInProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    const { setIsLoggedIn, } = useUsers()
    const formik: FormikValues = useFormik({
        initialValues: {
            email: "",
            password: "",
            stayloggedin: false
        },
        validationSchema: yup.object({
            email: yup.string().email().min(5).required(),
            password: yup.string().min(5).max(20).required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,),
            stayloggedin: yup.boolean()
        }),
        onSubmit: (values) => {
            checkUser(values.email, values.password).then((res) => {
                if (res.data.length) {
                    setIsLoggedIn(true);
                    successMsg(`Welcome`);
                    localStorage.setItem("token", res.data);
                    navigate("/");
                } else {
                    errorMsg("Email or password is invalid !")
                }
            }).catch((err) => {
                console.log(err);
                errorMsg(`Email or password is invalid!`);
            })
        }
    })
    return (
        <div data-aos="fade-in"
            data-aos-offset="0">
            <h1 className=" display-2">Login</h1>
            <div className="loginmaindiv ">
                <form className="form loginform" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-2 w-50 mx-3 ">
                        <input
                            type="text"
                            className="form-control "
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="form-floating mb-2 w-50 mx-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="password">Password</label>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-danger">{formik.errors.password}</p>
                        )}
                    </div>
                    <div className="form-check mb-3 mx-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="stayloggedin"
                            name="stayloggedin"
                            checked={formik.values.stayloggedin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label" htmlFor="stayloggedin">
                            Stay logged in <i className="fa-solid fa-lock"></i>
                        </label>
                    </div>
                    <button
                        className="btn btn-primary  mt-3 w-50"
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}>
                        <i className="fa-solid fa-key"></i> Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;