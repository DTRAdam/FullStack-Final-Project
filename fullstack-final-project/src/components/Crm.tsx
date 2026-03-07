import { FunctionComponent, useState } from "react";
import useUsers from "../hooks/useUsers";
import Pagination from "./Pagination";
import useProducts from "../hooks/useProducts";
import { Users } from "../interfaces/users";
import { deleteUser } from "../services/userServices";
import Swal from "sweetalert2";
import { successMsg } from "../services/feedBack";
import EditUserModal from "./EditUserModal";
interface CrmProps {

}

const Crm: FunctionComponent<CrmProps> = () => {
    const { allUsers, setAllUsers } = useUsers()
    const { loading } = useProducts()
    const [currentPage, setCurrentPage] = useState(1);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const usersPerPage = 15;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = allUsers.slice(startIndex, endIndex);
    return (
        <div data-aos="fade-in"
            data-aos-offset="0">
            <h1 className="section-title ">Crm <i className="fa-regular fa-clipboard"></i></h1>
            {loading ? (
                <div className="loader">
                    <div className="box1"></div>
                    <div className="box2"></div>
                    <div className="box3"></div>
                </div>
            ) : (

                allUsers.length ? (
                    <div className="crmmaindiv">
                        <div className="crm-grid">
                            {currentUsers.map((user: Users) => (
                                <div className="crm-card" key={user._id}>
                                    <span className={`crm-badge ${user.isAdmin ? 'admin' : ''}`}>
                                        {user.isAdmin ? 'Admin' : 'User'}
                                    </span>
                                    <div className="crm-card-header">
                                        <div className="crm-avatar">
                                            {user.name.first.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3>{user.name.first} {user.name.last}</h3>
                                        </div>
                                    </div>
                                    <div className="crm-info">
                                        <div className="crm-info-item">
                                            <i className="fa-solid fa-envelope"></i>
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="crm-info-item">
                                            <i className="fa-solid fa-phone"></i>
                                            <span>{user.phone}</span>
                                        </div>
                                        <div className="crm-info-item">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <span>{user.address.country}, {user.address.city}</span>
                                        </div>
                                    </div>
                                    <div className="crm-actions">
                                        <button
                                            className="crm-action-btn crm-btn-edit"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenEditModal(true);
                                            }}
                                        >
                                            <i className="fa-solid fa-user-pen"></i> Edit
                                        </button>
                                        <button
                                            className="crm-action-btn crm-btn-delete"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: `Delete ${user.name.first}?`,
                                                    text: "This will also delete their cart. You cannot undo this!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#d33",
                                                    confirmButtonText: "Yes, delete it!"
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteUser(user._id!)
                                                            .then(() => {
                                                                successMsg("User deleted");
                                                                setAllUsers((prev: Users[]) => prev.filter((u: Users) => u._id !== user._id));
                                                            })
                                                            .catch(err => console.error(err));
                                                    }
                                                });
                                            }}
                                        >
                                            <i className="fa-solid fa-trash-can"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(allUsers.length / usersPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                ) : (
                    <p>No users found</p>
                )
            )}

            <EditUserModal
                show={openEditModal}
                onHide={() => setOpenEditModal(false)}
                refresh={() => window.location.reload()}
                user={selectedUser}
            />

        </div >
    );

};


export default Crm;