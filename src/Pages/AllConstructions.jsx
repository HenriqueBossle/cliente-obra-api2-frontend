import { useState, useEffect, useContext } from "react";

import api from "../Api/api";
import Card from "../Components/Card";

import "./AllConstructions.css";
import { AuthContext } from "../context/AuthContext";

function AllConstructions() {

    const [constructions, setConstructions] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { authenticated, logout } = useContext(AuthContext);
    const [generatingPdf, setGeneratingPdf] = useState(false);

    useEffect(() => {

        const fetchConstructions = async () => {

            try {

                const token = localStorage.getItem('token');

                const response = await api.get('/constructions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                setConstructions(response.data.data);

            } catch (error) {

                console.error("Erro ao buscar dados:", error);

            } finally {

                setLoading(false);
            }
        };

        fetchConstructions();

    }, []);

    const generateAllPdf = async () => {
        try {
            setGeneratingPdf(true);

            const response = await api.get('/constructions/pdf', {
                responseType: 'blob',
            });

            const file = new Blob([response.data], {
                type: 'application/pdf',
            });

            const fileURL = window.URL.createObjectURL(file);

            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'todas-construcoes.pdf';

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(fileURL);

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF das construções.');
        } finally {
            setGeneratingPdf(false);
        }
    };

    return (
        <div className="all-container">

            <div className="overlay"></div>

            <div className="content">

                <div className="header">

                    <h1>Todas as Construções</h1>

                    <p>
                        Gerencie todas as obras cadastradas
                    </p>

                </div>

                     
                {!loading && constructions.length > 0 && (
                    <div className="pdf-container">
                        <button
                            onClick={generateAllPdf}
                            disabled={generatingPdf}
                            className="pdf-btn"
                        >
                            {generatingPdf
                                ? 'Gerando PDF de todos os registros...'
                                : 'Gerar PDF de todos os registros'}
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="loading">
                        Carregando construções...
                    </div>
                )}

                {!loading && constructions.length === 0 && (
                    <div className="empty">
                        Nenhuma construção encontrada.
                    </div>
                )}

                <div className="cards-grid">

                    {constructions.map(c => (

                        <Card
                            key={c.id}
                            id={c.id}
                            construction_name={c.construction_name}
                            builder_name={c.builder_name}
                            builder_phone={c.builder_phone}
                            cpf_cnpj={c.cpf_cnpj}
                            sitemanager_name={c.sitemanager_name}
                            sitemanager_phone={c.sitemanager_phone}
                            address={c.address}
                            type={c.type}
                            status={c.status}
                            volume={c.volume}
                            start_date={c.start_date}
                            finish_date={c.finish_date}
                            notes={c.notes}

                            detalhes={false}
                        />


                    ))}

                </div>

            </div>
        </div>
    );
}

export default AllConstructions;