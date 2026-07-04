import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Home from "../Pages/Home"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"
import EmailVerificado from "../Pages/Auth/EmailVerified"
import ForgotPassword from "../Pages/Auth/ForgotPassword"
import ResetPassword from "../Pages/Auth/ResetPassword"
import Navbar from "../Components/Navbar"
import AllConstructions from "../Pages/AllConstructions"
import Create from "../Pages/Create"
import ProtectedRoute from "./ProtectedRoutes"
import ShowConstruction from "../Pages/ShowConstruction"
import EditConstruction from "../Pages/EditConstruction"
import Profile from "../Pages/Profile"
import { AuthProvider } from "../context/AuthContext"
import EmailVerified from "../Pages/Auth/EmailVerified"

function AppRoutes() {
    return (
        <BrowserRouter>
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
            </Routes>
            </AuthProvider>
        </BrowserRouter>
       
    )
}

export default AppRoutes