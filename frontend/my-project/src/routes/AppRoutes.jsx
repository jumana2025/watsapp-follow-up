import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customer";
import CustomerDetail from "../pages/CustomerDetail";
import ProtectedRoute from "./ProtectedRoutes";
import FollowUps from "../pages/FollowUps";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/followups" element={<FollowUps />} />

                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customers/:id"
                    element={
                        <ProtectedRoute>
                            <CustomerDetail />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;