import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../../services/authService";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

            await signupUser(formData);

            alert("Account Created Successfully");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.detail || "Signup Failed"
            );

        }

    };

    return (

        <div className="container">

            <form
                className="form"
                onSubmit={handleSubmit}
            >

                <h2>Create Account</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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
                    Create Account
                </button>

                <p>

                    Already have an account?

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Signup;