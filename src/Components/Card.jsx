import { Link } from "react-router-dom";
import "./Card.css";

function Card({
    id,
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
    notes,

    detalhes,
    onDelete
})

{
 console.log(id)
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
                    <strong>ID:</strong> {id}
                </p>

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

            {detalhes ? "" : 
                <Link className="show-btn" to={`/construction/${id}`}>
                    Ver mais
                </Link>}
                
                
                { detalhes ? 
                <>
                    <Link className="edit-btn" to={`/construction/edit/${id}`}>
                        Editar
                    </Link>

                    <button className="delete-btn" onClick={onDelete}>
                        Excluir
                    </button>
                </>
                : ""
                }
            </div>

        </div>
    )
}

export default Card;