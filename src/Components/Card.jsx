import { Link } from "react-router-dom";
import "./Card.css";

function Card({
    construction_name,
    builder_name,
    builder_phone,
    cpf_cnpj,
    sitemanager_name,
    sitemanager_phone,
    address,
    type,
    status,
    volume,
    date,
    notes
}){

    return(
        <div className="card-container">

            <div className="card-header">
                <h2>{construction_name}</h2>

                <span className={`status ${status?.toLowerCase().replace(" ", "-")}`}>
                    {status}
                </span>
            </div>

            <div className="card-body">

                <p>
                    <strong>Cliente:</strong> {builder_name}
                </p>

                <p>
                    <strong>Telefone:</strong> {builder_phone}
                </p>

                <p>
                    <strong>CPF/CNPJ:</strong> {cpf_cnpj}
                </p>

                <p>
                    <strong>Responsável:</strong> {sitemanager_name}
                </p>

                <p>
                    <strong>Telefone Resp.:</strong> {sitemanager_phone}
                </p>

                <p>
                    <strong>Endereço:</strong> {address}
                </p>

                <p>
                    <strong>Tipo:</strong> {type}
                </p>

                <p>
                    <strong>Volume:</strong> {volume}
                </p>

                <p>
                    <strong>Data:</strong> {date}
                </p>

                <p className="notes">
                    <strong>Observações:</strong> {notes}
                </p>

            </div>

            <div className="card-buttons">

                <Link className="show-btn" to="/show">
                    Ver mais
                </Link>

                <button className="delete-btn">
                    Delete
                </button>

            </div>

        </div>
    )
}

export default Card;