import React from "react";
import "./Login.css"

const Login = ({handleLogin}) => {
    const [data, setData] = React.useState({
        password: "",
        email: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((oldData) => ({
            ...oldData,
            [name]:value
        }))

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {password, email} = data
        handleLogin(password, email);
        resetInputField()
    };

    const resetInputField = () => {
        setData({
            password: "",
            email: "",
        });
    };

    return (
        <div className="login">
            <h2 className="login__title">Войти</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <span></span>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={data.password || ""}
                    onChange={handleChange}
                    placeholder="Пароль"
                />
                <span></span>
                <button
                    type="submit"
                >Войти
                </button>
            </form>
        </div>
    )
};

export default Login;