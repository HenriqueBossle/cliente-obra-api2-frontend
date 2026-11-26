import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found-page">
            <section className="not-found-card" aria-labelledby="not-found-title">
                <p className="not-found-code">404</p>
                <h1 id="not-found-title">Página não encontrada</h1>
                <p>Não encontramos essa página. Que tal voltar para a página inicial?</p>
                <Link to="/" className="not-found-home-link">Voltar para a home</Link>
            </section>
        </main>
    );
}

export default NotFound;
