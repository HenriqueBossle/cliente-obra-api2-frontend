import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import api from "../Api/api";
import Card from "../Components/Card";

function ShowConstruction(){
    const [construction, setConstruction] = useState(null);
    const { id } = useParams()
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const { authenticated, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    console.log(id)
    

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

                const handleDelete = async () =>{ await api.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                
                })};
    

    return (
        <>
                {loading && (
                    <div className="loading">
                        Carregando construções...
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
                            date={construction.date}
                            notes={construction.notes}

                            detalhes = {true}

                            onDelete={handleDelete}
                        />
                    )}
                </div>
        </>
    )
}

export default ShowConstruction