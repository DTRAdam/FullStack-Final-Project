import { FunctionComponent } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    const { isLoggedIn, setIsLoggedIn, isAdmin } = useUsers()
    return (
        <>
            <div className="navlinks ">
                <nav className=" bg-transparent navbar text-light navbar-expand-lg">
                    <div className="container-fluid">
                        <NavLink to={"/"} className="navbar-brand fa-2x text-light"> <div className="logo"></div></NavLink>
                        <button className=" text-light navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to={"/about"} className="text-light nav-link active" aria-current="page">About <i className="fa-regular fa-compass"></i></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={"/titles"} className="text-light nav-link" >Titles <i className="fa-solid fa-trophy"></i></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={"/products"} className="text-light nav-link" >Products <i className="fa-solid fa-tag"></i></NavLink>
                                </li>
                                {isLoggedIn && <li className="nav-item">
                                    <NavLink to={"/favoritesproduct"} className="text-light nav-link" >Products <i className="fa-solid fa-heart"></i></NavLink>
                                </li>}
                                <li className="nav-item">
                                    <NavLink to={"/cartc"} className=" text-light nav-link">Cart <i className="fa-solid fa-cart-shopping"></i></NavLink>
                                </li>
                                {isAdmin && <li className="nav-item">
                                    <NavLink to={"/crm"} className=" text-light nav-link">Crm <i className="fa-regular fa-clipboard"></i></NavLink>
                                </li>}
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-secondary mx-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                {isLoggedIn && <button className="btn btn-warning display-5 mx-1" onClick={() => {
                                    navigate("/");
                                    setIsLoggedIn(false);
                                    localStorage.removeItem("token");
                                }}>Logout</button>}
                                {!isLoggedIn && <button className="btn text-light btn-outline-success mx-1" type="submit" onClick={() => {
                                    navigate("/register")
                                }}>Register</button>}
                                {!isLoggedIn && <button className="btn text-light btn-outline-primary mx-1" type="submit" onClick={() => {
                                    navigate("/login")
                                }}>Login</button>}
                            </form>
                        </div>
                    </div>
                </nav >
            </div >
        </>
    );
}

export default NavBar;
