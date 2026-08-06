import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(formData);

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.detail || "Login Failed"
            );

        }

    };

    return (

        <div className="container">

            <form
                className="form"
                onSubmit={handleSubmit}
            >

                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>

                    Don't have an account?

                    <Link to="/signup">
                        Signup
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;