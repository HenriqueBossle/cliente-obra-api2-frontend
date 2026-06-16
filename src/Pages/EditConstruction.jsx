import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditConstruction.css";
import api from "../Api/api";

function EditConstruction() {
    const { id } = useParams();
    const navigate = useNavigate();
   
    const [data, setData] = useState({
        construction_name: "",
        builder_name: "",
        builder_phone: "",
        cpf_cnpj: "",
        sitemanager_name: "",
        sitemanager_phone: "", 
        address: "",
        type: "",
        status: "",
        volume: "",
        start_date: "",
        finish_date: "",
        notes: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConstruction = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/constructions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                const construction = response.data.data;
                
                // Prefill state and ensure date is in YYYY-MM-DD format for input[type="date"]
                setData({
                    construction_name: construction.construction_name || "",
                    builder_name: construction.builder_name || "",
                    builder_phone: construction.builder_phone || "",
                    cpf_cnpj: construction.cpf_cnpj || "",
                    sitemanager_name: construction.sitemanager_name || "",
                    sitemanager_phone: construction.sitemanager_phone || "",
                    address: construction.address || "",
                    type: construction.type || "",
                    status: construction.status || "",
                    volume: construction.volume || "",
                    start_date: construction.start_date ? construction.start_date.substring(0, 10) : "",
                    finish_date: construction.finish_date ? construction.finish_date.substring(0, 10) : "",
                    notes: construction.notes || ""
                });
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar obra para edição:", err);
                setError(err.response?.data?.message || "Erro ao carregar dados da obra.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchConstruction();
        } else {
            setError("ID da obra inválido.");
            setIsLoading(false);
        }
    }, [id]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (saving) return;

        setSaving(true);
        

        try {
        const token = localStorage.getItem('token');
        
            await api.put(`/constructions/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Accept': 'application/json',
                }
            });
         
            alert("Obra atualizada com sucesso!!!");
            navigate(`/construction/${id}`);
        } catch (err) {
            console.error("Erro ao atualizar obra:", err);
            alert(err.response?.data?.message || "Erro ao salvar alterações da obra.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="edit-container">
            <div className="overlay"></div>

            <div className="edit-card">
                <h1>Editar Obra</h1>
                <p>Altere os dados da construção nos campos abaixo</p>

                {isLoading && (
                    <div className="form-feedback loading-msg">
                        Carregando dados da obra...
                    </div>
                )}

                {error && (
                    <div className="form-feedback error-msg">
                        <p>{error}</p>
                        <button type="button" onClick={() => navigate(-1)} className="back-btn">
                            Voltar
                        </button>
                    </div>
                )}

                {!isLoading && !error && (
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={saving} >
                        <div className="form-grid">
                            <div>
                                <label htmlFor="construction_name">Nome da Obra</label>
                                <input
                                    id="construction_name"
                                    type="text"
                                    name="construction_name"
                                    placeholder="Nome da Obra"
                                    value={data.construction_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="builder_name">Nome do Cliente</label>
                                <input
                                    id="builder_name"
                                    type="text"
                                    name="builder_name"
                                    placeholder="Nome do Cliente"
                                    value={data.builder_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="builder_phone">Telefone do Cliente</label>
                                <input
                                    id="builder_phone"
                                    type="text"
                                    name="builder_phone"
                                    placeholder="Telefone do Cliente"
                                    value={data.builder_phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="cpf_cnpj">CPF ou CNPJ</label>
                                <input
                                    id="cpf_cnpj"
                                    type="text"
                                    name="cpf_cnpj"
                                    placeholder="CPF ou CNPJ"
                                    value={data.cpf_cnpj}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="sitemanager_name">Nome do Responsável</label>
                                <input
                                    id="sitemanager_name"
                                    type="text"
                                    name="sitemanager_name"
                                    placeholder="Nome do Responsável"
                                    value={data.sitemanager_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="sitemanager_phone">Telefone do Responsável</label>
                                <input
                                    id="sitemanager_phone"
                                    type="text"
                                    name="sitemanager_phone"
                                    placeholder="Telefone do Responsável"
                                    value={data.sitemanager_phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="address">Endereço da Obra</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    placeholder="Endereço da Obra"
                                    value={data.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="type">Tipo da obra</label>
                                <input
                                    id="type"
                                    type="text"
                                    name="type"
                                    placeholder="Tipo da obra"
                                    value={data.type}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="status">Status da obra</label>
                                <input
                                    id="status"
                                    type="text"
                                    name="status"
                                    placeholder="Status da obra"
                                    value={data.status}
                                    onChange={handleChange}
                                />
                            </div>
                          
                            <div>
                                <label htmlFor="volume">Volume</label>
                                <input
                                    id="volume"
                                    type="number"
                                    name="volume"
                                    placeholder="Volume"
                                    value={data.volume}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="start_date">Data de Início</label>
                                <input
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={handleChange}
                                />
                            </div>
                             <div>
                                <label htmlFor="finish_date">Data de previsão de término</label>
                                <input
                                    id="finish_date"
                                    type="date"
                                    name="finish_date"
                                    value={data.finish_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="textarea-container">
                            <label htmlFor="notes">Observações</label>
                            <textarea
                                id="notes"
                                name="notes"
                                placeholder="Observações"
                                value={data.notes}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="button-group">
                            <button type="submit" disabled={saving} className="submit-btn">
                                {saving ? "Salvando..." : "Salvar Alterações"}
                            </button>
                            <button type="button" onClick={() => navigate(-1)} className="cancel-btn" disabled={saving}>
                                Cancelar
                            </button>
                        </div>
                        </fieldset>
                    </form>
                    
                )}
            </div>
        </div>
    );
}

export default EditConstruction;
