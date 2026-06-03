import { use, useState } from "react";
import api from "../../Api/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault(); 

        if(formData.password !== formData.password_confirmation){
            alert("As senhas são diferentes");
            return;
        }

        const response = await api.post('/register', formData);
        alert("Conta criada com sucesso!!!")

        navigate("/")

        if(error.response && error.response.status === 422){
            alert("Erro: " + Object.values(error.response.data.errors).flat().join(", "));
        }
    
    }

       return(
        <div className="register-container">

            <div className="overlay"></div>

            <div className="register-card">

                <h1>ClienteObra</h1>

                <p>
                    Crie sua conta para gerenciar construções
                </p>

                <form onSubmit={handleRegister}>

                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome completo"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirmar senha"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" onClick={handleRegister} className="register-btn">
                        Criar conta
                    </button>

                </form>

                <span className="login-link">
                    Já possui conta?

                    <Link to="/login">
                        Entrar
                    </Link>
                </span>

            </div>
        </div>
    );
}

export default Register