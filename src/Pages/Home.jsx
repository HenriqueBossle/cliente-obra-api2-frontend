import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";

function Home() {

        const [isLogged, setIsLogged] = useState(
            !!localStorage.getItem("token")
        )

    return(
        <div className="home-container">

            <div className="overlay"></div>

            <div className="home-card">

                <h1>ClienteObra</h1>

                <p>
                    Gerencie suas obras, clientes e construções
                    de forma simples e organizada.
                </p>

            {isLogged ? (
                <div className="buttons">

                    <Link to="/allconstructions">
                        <button className="view-btn">
                            Ver todas as obras
                        </button>
                    </Link>

                    <Link to="/create">
                        <button className="create-btn">
                            Criar nova obra
                        </button>
                    </Link>

                </div>
            ) : (
                <div className="buttons">
                    <Link to="/login">
                        <button className="view-btn">
                            Entrar
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="create-btn">
                            Cadastrar nova conta
                        </button>
                    </Link>
                    </div>
        )}

                
            

                

            </div>
        </div>
    )
}

export default Home;