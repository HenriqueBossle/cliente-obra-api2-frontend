import { useState } from "react";
import { createCookieSessionStorage, useNavigate } from "react-router-dom";
import "./Create.css";
import api from "../Api/api";

function Create(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

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
        date: "",
        notes: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)

        const token = localStorage.getItem('token');
        try{
            const response = await api.post('/constructions', data, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Accept': 'application/json',
                }}
            );
         
            alert("Obra adicionada com sucesso!!!")
            navigate("/allconstructions")
        }catch(error){
            console.error("Erro ao criar obra:", error);
        } finally {
            setIsLoading(false)
        }
        

        setData({
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
            date: "",
            notes: ""
        })
    }

    

    return(
        <>
            <div className="create-container">

            <div className="overlay"></div>

            <div className="create-card">

                <h1>Nova Obra</h1>

                <p>
                    Cadastre uma nova construção
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <input
                            type="text"
                            name="construction_name"
                            placeholder="Nome da Obra"
                            value={data.construction_name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="builder_name"
                            placeholder="Nome do Cliente"
                            value={data.builder_name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="builder_phone"
                            placeholder="Telefone do Cliente"
                            value={data.builder_phone}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="cpf_cnpj"
                            placeholder="CPF ou CNPJ"
                            value={data.cpf_cnpj}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="sitemanager_name"
                            placeholder="Nome do Responsável"
                            value={data.sitemanager_name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="sitemanager_phone"
                            placeholder="Telefone do Responsável"
                            value={data.sitemanager_phone}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Endereço da Obra"
                            value={data.address}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="type"
                            placeholder="Tipo da obra"
                            value={data.type}
                            onChange={handleChange}
                        />
                        
                        <input
                            type="text"
                            name="status"
                            placeholder="Status da obra"
                            value={data.status}
                            onChange={handleChange}
                        />
                      
                        <input
                            type="number"
                            name="volume"
                            placeholder="Volume"
                            value={data.volume}
                            onChange={handleChange}
                        />

                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                        />

                    </div>

                    <textarea
                        name="notes"
                        placeholder="Observações"
                        value={data.notes}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Criando..." : "Criar obra"}
                    </button>

                </form>

            </div>
        </div>
        </>
    )
}

export default Create