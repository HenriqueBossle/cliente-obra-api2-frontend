import { use, useState } from "react";
import api from "../../Api/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [showSenha, setShowSenha] = useState(false)
    const [showConfirmar, setShowConfirmar] = useState(false)

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




        const payload = {
            ...formData,
            device_name: navigator.userAgent.split(" ")[1] // Gera algo como "Browser Mozilla" ou você pode fixar uma string como "React Web"
        };

        if (formData.password !== formData.password_confirmation) {
            alert("As senhas são diferentes");
            return;
        }

        setIsLoading(true)

        try {

            const response = await api.post('/register', payload, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            alert("Conta criada com sucesso!!!")

            navigate("/")
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert("Erro: " + Object.values(error.response.data.errors).flat().join(", "));
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="register-container">

            <div className="overlay"></div>

            <div className="register-card">

                <h1>ClienteObra</h1>

                <p>
                    Crie sua conta para gerenciar obras
                </p>

                <form onSubmit={handleRegister}>
                    <fieldset disabled={isLoading}>
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
                                type={showSenha ? "text" : "password"}
                                name="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowSenha(!showSenha)}
                            >
                                {showSenha ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>

                        <div className="input-group">
                            <input
                                type={showConfirmar ? "text" : "password"}
                                name="password_confirmation"
                                placeholder="Confirmar senha"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowConfirmar(!showConfirmar)}
                            >
                                {showConfirmar ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </fieldset>

                    <button type="submit" onClick={handleRegister} className="register-btn" disabled={isLoading}>
                        {isLoading ? "Criando conta" : "Criar conta"}
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