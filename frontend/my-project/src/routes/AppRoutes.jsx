import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customer";
import CustomerDetail from "../pages/CustomerDetail";
import ProtectedRoute from "./ProtectedRoutes";
import FollowUps from "../pages/Followups";
import CompletedFollowUps from "../pages/CompletedFollowUps";
import TodayFollowUps from "../pages/TodayFollowUps";
import Reports from "../pages/Reports";

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
                    path="/completed-followups"
                    element={
                        <ProtectedRoute>
                            <CompletedFollowUps />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/today-followups"
                    element={
                        <ProtectedRoute>
                            <TodayFollowUps />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

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