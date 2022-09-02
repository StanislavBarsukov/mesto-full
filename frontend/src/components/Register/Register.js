import React from "react";
import "./Register.css";
import {Link} from "react-router-dom";

const Register = ({handleRegister}) => {
    const [data, setData] = React.useState({
        password: "",
        email: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setData((oldData) => ({
                ...oldData,
                [name]:value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            const {password, email} = data
            handleRegister (password, email)
            resetInputField()
    };

    const resetInputField = () => {
        setData({
            password: "",
            email: "",
        });
    };

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <span></span>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                />
                <span></span>
                <button
                    type="submit"
                    >Зарегистрироваться
                </button>
            </form>
            <div className="register__container">
                <p className="register__sign-in">Уже зарегистрированы?</p>
                <Link className="register__sign-in" to="/sing-in">Войти</Link>
            </div>
        </div>
    )
};

export default Register;