import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Home from "../Pages/Home"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"
import Navbar from "../Components/Navbar"
import AllConstructions from "../Pages/AllConstructions"
import Create from "../Pages/Create"
import ProtectedRoute from "./ProtectedRoutes"
import ShowConstruction from "../Pages/ShowConstruction"
import { AuthProvider } from "../context/AuthContext"

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

                {/* Rotas protegidas */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
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

                <Route path="/show/:id" element={
                    <ProtectedRoute>
                        <ShowConstruction />
                    </ProtectedRoute>
                }/>
            </Routes>
            </AuthProvider>
        </BrowserRouter>
       
    )
}

export default AppRoutes