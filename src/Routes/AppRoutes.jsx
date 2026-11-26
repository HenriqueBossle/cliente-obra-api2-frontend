import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import App from "../App"
import Home from "../Pages/Home"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"
import EmailVerificado from "../Pages/Auth/EmailVerified"
import ForgotPassword from "../Pages/Auth/ForgotPassword"
import ResetPassword from "../Pages/Auth/ResetPassword"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import AllConstructions from "../Pages/AllConstructions"
import Create from "../Pages/Create"
import ProtectedRoute from "./ProtectedRoutes"
import ShowConstruction from "../Pages/ShowConstruction"
import EditConstruction from "../Pages/EditConstruction"
import Profile from "../Pages/Profile"
import Feedback from "../Pages/Feedback"
import { AuthProvider } from "../context/AuthContext"
import EmailVerified from "../Pages/Auth/EmailVerified"
import NotFound from "../Pages/NotFound"

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

function AppRoutes() {
    return (
        <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
            <Navbar />
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<App />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/email-verified" element={<EmailVerified />} />
                <Route path="/email-verified/:id/:hash" element={<EmailVerified />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Rotas protegidas */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/feedback" element={
                    <ProtectedRoute>
                        <Feedback />
                    </ProtectedRoute>
                } />
                <Route path="/allconstructions" element={
                    <ProtectedRoute>
                        <AllConstructions />
                    </ProtectedRoute>
                } />
                <Route path="/create" element={
                    <ProtectedRoute>
                        <Create />
                    </ProtectedRoute>
                } />

                <Route path="/construction/:id" element={
                    <ProtectedRoute>
                        <ShowConstruction />
                    </ProtectedRoute>
                }/>

                <Route path="/construction/edit/:id" element={
                    <ProtectedRoute>
                        <EditConstruction />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            </AuthProvider>
        </BrowserRouter>
       
    )
}

export default AppRoutes
