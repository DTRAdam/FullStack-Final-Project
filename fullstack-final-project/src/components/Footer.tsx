import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    const { isLoggedIn } = useUsers()
    return (
        <>
            <ul className="footerul">
                <li>
                    <Link className="link" to={"https://www.instagram.com//"}><i className="fa-brands fa-instagram"></i><p>Instagram</p></Link>
                </li>
                <li>
                    <Link className="link" to={"https://www.facebook.com//"}><i className="fa-brands fa-square-facebook"></i><p className="footerp">Facebook</p></Link>
                </li>
                {isLoggedIn && <li>
                    <Link className="link" to={"/favoriteproduct"}><i className="fa-solid fa-heart"></i><p className="footerp">Favorite</p></Link>
                </li>}
                {isLoggedIn ?? <li>
                    <Link className="link" to={isLoggedIn ? "/cartc" : "/register"}><i className="fa-solid fa-cart-shopping"></i><p>Cart</p></Link>
                </li>}
                <li>
                    <Link className="link" to={"tel:0549189923"}><i className="fa-solid fa-at"></i><p>GYMBox</p></Link>
                </li>
            </ul>
            <p>All rights reserved to Adam Kesenjenko <i className="fa-solid fa-copyright"></i></p>
        </>
    );
}

export default Footer;