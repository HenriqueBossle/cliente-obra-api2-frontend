import { Link } from "react-router-dom";
import api from "../Api/api";
import "./Card.css";
import { useState } from "react";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
    concrete_volume,
    mortar_volume,
    start_date,
    finish_date,
    notes,

    detalhes,
    onDelete
})



{


const format_start = start_date
    ? format(parseISO(start_date), "dd/MM/yyyy", { locale: ptBR })
    : "Não informado";

const format_finish = finish_date
    ? format(parseISO(finish_date), "dd/MM/yyyy", { locale: ptBR })
    : "Não informado";


 const [generatingPdf, setGeneratingPdf] = useState(false);

 const generatePdf = async () => {
    try {
        setGeneratingPdf(true)
        const response = await api.get(
            `/constructions/${id}/pdf`,
            {
                responseType: "blob",
            }
        );

        const file = new Blob(
            [response.data],
            {
                type: "application/pdf",
            }
        );

        const fileURL = window.URL.createObjectURL(file);

        const link = document.createElement("a");

        link.href = fileURL;
        link.download = `construcao-${id}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(fileURL);

    } catch (error) {

        console.error("Erro ao gerar PDF:", error);

        alert("Erro ao gerar PDF da obra.");
    } finally {
        setGeneratingPdf(false)
    }
};
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
                    <strong>Volume de concreto em m³:</strong> {Number(concrete_volume).toFixed(1)}
                </p>

                <p>
                    <strong>Volume de argamassa em m³:</strong> {Number(mortar_volume).toFixed(1)}
                </p>

                <p>
                    <strong>Data de inicio:</strong> {format_start}
                </p>

                <p>
                    <strong>Previsão de finalização:</strong> {format_finish}
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

                    <button
                        onClick={generatePdf}
                        disabled={generatingPdf}
                        className="pdf-btn"
                    >
                        {generatingPdf
                            ? 'Gerando PDF...'
                            : 'Gerar PDF'}
                    </button>
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