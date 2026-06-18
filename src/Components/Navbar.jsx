import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

import "./Navbar.css"

function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()

    const [isLogged, setIsLogged] = useState(
        !!localStorage.getItem("token")
    )

    useEffect(() => {
        setIsLogged(!!localStorage.getItem("token"))
    }, [location])

    const handleLogout = () => {

        localStorage.removeItem("token")

        setIsLogged(false)

        navigate("/login")
    }

    return (
        <header>

            <Link to="/">
                ClienteObra
            </Link>

            <div>

                {isLogged ? (
                    <>
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/allconstructions">
                            Obras
                        </Link>

                        <Link to="/create">
                            Criar
                        </Link>

                        <Link to="/profile">
                            Perfil
                        </Link>

                        <button onClick={handleLogout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>

        </header>
    )
}

export default Navbar