import React from "react";
import logo from "../../images/logo.svg";
import {Link, useLocation} from "react-router-dom";
import "./Header.css";

const Header = ({email, handleLogout}) => {
    const location = useLocation();

    return (
        <div className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип сайта"
            />
            {location.pathname === "/sing-in" &&(
                <Link to="/sing-up" className="header__link">Регистрация</Link>
            )}
            {location.pathname ==="/sing-up" && (
                <Link to="/sing-in" className="header__link">Войти</Link>
            )}
            {location.pathname === "/" && (
                <nav className="header__navigate">
                    <p className="header__info">{email}</p>
                    <span className="header__logout" onClick={handleLogout}>Выйти</span>
                </nav>
            )}
        </div>
    )

};

export default Header;