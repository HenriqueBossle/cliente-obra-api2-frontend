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
        concrete_volume: "",
        mortar_volume: "",
        start_date: "",
        finish_date: "",
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
            concrete_volume: "",
            mortar_volume: "",
            start_date: "",
            finish_date: "",
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
                    <fieldset disabled={isLoading}>
                    <div className="form-grid">
                    
                        <label htmlFor="construction_name">Nome da Obra</label>

                        <input
                            type="text"
                            name="construction_name"
                            placeholder="Ex: Prédio da Empresa X"
                            value={data.construction_name}
                            onChange={handleChange}
                        />

                        <label htmlFor="builder_name">Nome do Construtor</label>
                        <input
                            type="text"
                            name="builder_name"
                            placeholder="Nome da empresa ou do proprietário"
                            value={data.builder_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="builder_phone">Telefone do Construtor</label>

                        <input
                            type="text"
                            name="builder_phone"
                            placeholder="Ex: 51 90000-0000"
                            value={data.builder_phone}
                            onChange={handleChange}
                        />
                        <label htmlFor="cpf_cnpj">CPF ou CNPJ</label>

                        <input
                            type="text"
                            name="cpf_cnpj"
                            placeholder="Ex: 000.000.000-00 ou 00.000.000/0000-00"
                            value={data.cpf_cnpj}
                            onChange={handleChange}
                        />

                        <label htmlFor="sitemanager_name">Nome do Responsável</label>
                        <input
                            type="text"
                            name="sitemanager_name"
                            placeholder="Nome do mestre de obra ou outro responsável"
                            value={data.sitemanager_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="sitemanager_phone">Telefone do Responsável</label>
                        <input
                            type="text"
                            name="sitemanager_phone"
                            placeholder="Ex: 51 90000-0000"
                            value={data.sitemanager_phone}
                            onChange={handleChange}
                        />

                        <label htmlFor="address">Endereço da Obra</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Ex: Rua X, Bairro Y, Cidade Z"
                            value={data.address}
                            onChange={handleChange}
                        />

                        <label htmlFor="type">Tipo da obra</label>
                        <input
                            type="text"
                            name="type"
                            placeholder="Ex: Casa, Prédio, Pavilhão etc."
                            value={data.type}
                            onChange={handleChange}
                        />
                        
                        <label htmlFor="status">Status da obra</label>
                        <input
                            type="text"
                            name="status"
                            placeholder="Concluído, em execução, cancelado etc."
                            value={data.status}
                            onChange={handleChange}
                        />
                      
                        <label htmlFor="concrete_volume">Volume de concreto em m³</label>
                        <input
                            type="number"
                            name="concrete_volume"
                            placeholder="Ex: 1.5"
                            value={data.concrete_volume}
                            onChange={handleChange}
                        />
                        <label htmlFor="mortar_volume">Volume de argamassa em m³</label>
                        <input
                            type="number"
                            name="mortar_volume"
                            placeholder="Ex: 1.5"
                            value={data.mortar_volume}
                            onChange={handleChange}
                        />

                        <label htmlFor="start_date">Data de Início</label>

                        <input
                            type="date"
                            name="start_date"
                            value={data.start_date}
                            onChange={handleChange}
                        />

                        <label htmlFor="finish_date">Data de previsão de término</label>

                        <input
                            type="date"
                            name="finish_date"
                            value={data.finish_date}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="textarea-container">
                    <label htmlFor="notes">Observações</label>
                    <textarea
                        name="notes"
                        placeholder="Espaço para anotações sobre a obra."
                        value={data.notes}
                        onChange={handleChange}
                    ></textarea>
                    </div>
                    </fieldset>
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