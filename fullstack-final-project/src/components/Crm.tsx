import { FunctionComponent, useState } from "react";
import useUsers from "../hooks/useUsers";
import Pagination from "./Pagination";
import useProducts from "../hooks/useProducts";

interface CrmProps {

}

const Crm: FunctionComponent<CrmProps> = () => {
    const { users } = useUsers()
    const { loading } = useProducts()
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = users.slice(startIndex, endIndex);
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

                users.length ? (
                    <div className="crmmaindiv">
                        <table className="table table-dark crmtable table-striped">
                            <thead>
                                <tr>
                                    <th className="col-2">Id</th>
                                    <th className="col-2">First Name</th>
                                    <th className="col-2">Last Name</th>
                                    <th className="col-2">Phone</th>
                                    <th className="col-2">Email</th>
                                    <th className="col-1">IsAdmin</th>
                                    <th className="col-1">Country</th>
                                    <th className="col-1">Edit</th>
                                    <th className="col-1">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name.first}</td>
                                        <td>{user.name.last}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? "True" : "False"}</td>
                                        <td>{user.address.country}</td>
                                        <td>
                                            <i className="fa-solid fa-user-pen text-warning"></i>
                                        </td>
                                        <td>
                                            <i className="fa-solid fa-user-minus text-danger"></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(users.length / usersPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                ) : (
                    <p>No users found</p>
                )
            )}
        </div >
    );

};


export default Crm;