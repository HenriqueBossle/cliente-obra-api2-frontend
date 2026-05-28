import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return(
        <div className="home-container">

            <div className="overlay"></div>

            <div className="home-card">

                <h1>ClienteObra</h1>

                <p>
                    Gerencie suas obras, clientes e construções
                    de forma simples e organizada.
                </p>

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

            </div>
        </div>
    )
}

export default Home;