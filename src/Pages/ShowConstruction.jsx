import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../Api/api";
import Card from "../Components/Card";
import "./ShowConstruction.css";

function ShowConstruction(){
    const [construction, setConstruction] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const { authenticated, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const dialogRef = useRef(null);

    console.log(id);

    useEffect(() => {
        console.log("🔍 [STEP 1] URL Params:", { id });
        console.log("🔍 [STEP 1] ID Type:", typeof id);
        console.log("🔍 [STEP 1] ID Value:", id);

        if (!id) {
            console.error("❌ [STEP 1] ID não foi capturado da URL!");
            setError("ID não fornecido");
            setLoading(false);
            return;
        }

        const fetchConstructions = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("🔍 [STEP 2] Token present:", !!token);
                console.log("🔍 [STEP 2] Token first 20 chars:", token?.substring(0, 20) + "...");

                const url = `constructions/${id}`;
                console.log("🔍 [STEP 3] URL completa:", api.defaults.baseURL + url);

                const response = await api.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                console.log(response.data);

                console.log("✅ [STEP 4] Resposta recebida:", response);
                console.log("✅ [STEP 4] Data:", response.data);
                console.log("✅ [STEP 4] Data.data:", response.data.data);

                setConstruction(response.data.data);
                setError(null);
            } catch (error) {
                console.error("❌ [STEP 5] Erro na requisição:", error);
                console.error("❌ [STEP 5] Status:", error.response?.status);
                console.error("❌ [STEP 5] Status Text:", error.response?.statusText);
                console.error("❌ [STEP 5] Data:", error.response?.data);
                console.error("❌ [STEP 5] Config URL:", error.config?.url);
                console.error("❌ [STEP 5] Config Method:", error.config?.method);
                console.error("❌ [STEP 5] Config Headers:", error.config?.headers);
                
                setError(error.response?.data?.message || "Erro ao buscar construção");
            } finally {
                setLoading(false);
            }
        };

        fetchConstructions();
    }, [id]);

    const url = `constructions/${id}`;

    const openDeleteModal = () => {
        dialogRef.current?.showModal();
    };

    const closeDeleteModal = () => {
        dialogRef.current?.close();
    };

    const executeDelete = async () => {
        setDeleting(true);
        try {
            const token = localStorage.getItem('token');
            await api.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                }
            });
            alert("Obra excluída com sucesso.");
            closeDeleteModal();
            navigate("/allconstructions");
        } catch (error) {
            console.error("❌ Erro ao excluir obra:", error);
            alert("Não foi possível excluir a obra. Tente novamente.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="show-container">
            <div className="overlay"></div>
            <div className="content">
                {loading && (
                    <div className="loading">
                        Carregando detalhes...
                    </div>
                )}

                {error && (
                    <div className="loading" style={{ color: '#c0392b' }}>
                        {error}
                    </div>
                )}

                <div className="cards-grid">
                    {construction && (
                        <Card
                            key={construction.id}
                            id={construction.id}
                            construction_name={construction.construction_name}
                            builder_name={construction.builder_name}
                            builder_phone={construction.builder_phone}
                            cpf_cnpj={construction.cpf_cnpj}
                            sitemanager_name={construction.sitemanager_name}
                            sitemanager_phone={construction.sitemanager_phone}
                            address={construction.address}
                            type={construction.type}
                            status={construction.status}
                            volume={construction.volume}
                            start_date={construction.start_date}
                            finish_date={construction.finish_date}
                            notes={construction.notes}

                            detalhes={true}

                            onDelete={openDeleteModal}
                        />
                    )}
                </div>
            </div>

            <dialog ref={dialogRef} className="delete-modal">
                <div className="modal-content">
                    <h2>Excluir obra</h2>
                    <p>Tem certeza que deseja excluir esta obra? Esta ação não poderá ser desfeita.</p>
                    <div className="modal-buttons">
                        <button 
                            className="cancel-btn" 
                            onClick={closeDeleteModal} 
                            disabled={deleting}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="confirm-delete-btn" 
                            onClick={executeDelete} 
                            disabled={deleting}
                        >
                            {deleting ? "Excluindo..." : "Excluir"}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ShowConstruction;