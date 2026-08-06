import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;

}

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;