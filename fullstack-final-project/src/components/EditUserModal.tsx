import { FunctionComponent, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Users } from "../interfaces/users";
import { updateUser } from "../services/userServices";
import { successMsg } from "../services/feedBack";

interface EditUserModalProps {
    show: boolean;
    onHide: () => void;
    refresh: () => void;
    user: Users | null;
}

const EditUserModal: FunctionComponent<EditUserModalProps> = ({ show, onHide, refresh, user }) => {
    const formik = useFormik({
        initialValues: {
            name: {
                first: user?.name?.first || "",
                middle: user?.name?.middle || "",
                last: user?.name?.last || "",
            },
            phone: user?.phone || "",
            email: user?.email || "",
            image: {
                url: user?.image?.url || "",
                alt: user?.image?.alt || "",
            },
            address: {
                country: user?.address?.country || "",
                state: user?.address?.state || "",
                city: user?.address?.city || "",
                street: user?.address?.street || "",
                houseNumber: user?.address?.houseNumber || 0,
                zip: user?.address?.zip || 0,
            },
            isAdmin: user?.isAdmin || false,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().required().min(2),
                middle: yup.string(),
                last: yup.string().required().min(2),
            }),
            phone: yup.string().required().min(9).max(14).matches(/^05\d{8,9}$/, "Invalid Israeli phone number"),
            email: yup.string().required().email(),
            image: yup.object({
                url: yup.string().url(),
                alt: yup.string(),
            }),
            address: yup.object({
                country: yup.string().required(),
                state: yup.string(),
                city: yup.string().required(),
                street: yup.string().required(),
                houseNumber: yup.number().required().min(1),
                zip: yup.number().required(),
            }),
            isAdmin: yup.boolean().required(),
        }),
        onSubmit: (values) => {
            if (!user) return;
            const updatedUser: Partial<Users> = { ...values, _id: user._id };
            updateUser(updatedUser as Users)
                .then(() => {
                    successMsg("User updated successfully!");
                    onHide();
                    refresh();
                })
                .catch((err) => {
                    console.error("Error updating user:", err);
                    alert("Failed to update user.");
                });
        },
    });

    return (
        <Modal show={show} onHide={onHide} size="lg" centered className="add-product-modal">
            <Modal.Header closeButton className="border-bottom border-secondary bg-dark text-light">
                <Modal.Title><i className="fa-solid fa-user-pen me-2"></i> Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
                <form onSubmit={formik.handleSubmit}>
                    <h5 className="mb-3 text-danger border-bottom border-secondary pb-2">Personal Information</h5>
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <label className="form-label">First Name *</label>
                            <input
                                name="name.first"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name.first}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Middle Name</label>
                            <input
                                name="name.middle"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name.middle}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Last Name *</label>
                            <input
                                name="name.last"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name.last}
                            />
                        </div>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <label className="form-label">Email *</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone *</label>
                            <input
                                name="phone"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                        </div>
                    </div>

                    <h5 className="mb-3 text-danger border-bottom border-secondary pb-2 mt-4">Address</h5>
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <label className="form-label">Country *</label>
                            <input
                                name="address.country"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.country}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">City *</label>
                            <input
                                name="address.city"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.city}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Street *</label>
                            <input
                                name="address.street"
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.street}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">House Number *</label>
                            <input
                                name="address.houseNumber"
                                type="number"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.houseNumber}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">ZIP Code *</label>
                            <input
                                name="address.zip"
                                type="number"
                                className="form-control bg-secondary text-light border-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address.zip}
                            />
                        </div>
                    </div>

                    <h5 className="mb-3 text-danger border-bottom border-secondary pb-2 mt-4">Permissions</h5>
                    <div className="form-check mb-4">
                        <input
                            name="isAdmin"
                            type="checkbox"
                            className="form-check-input"
                            id="isAdminCheck"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.isAdmin}
                        />
                        <label className="form-check-label" htmlFor="isAdminCheck">
                            Is Administrator
                        </label>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary">
                        <button type="button" className="btn btn-outline-light" onClick={onHide}>Cancel</button>
                        <button type="submit" className="btn btn-danger px-4" disabled={!formik.isValid || !formik.dirty}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUserModal;
