import { useState } from "react"; // Removido o 'use' não utilizado
import api from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 

        const payload = {
            ...formData,
            device_name: navigator.userAgent.split(" ")[1] // Gera algo como "Browser Mozilla" ou você pode fixar uma string como "React Web"
        };
        console.log(payload)
        try {
            const response = await api.post('/login', payload, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }


            alert("Você entrou na conta com sucesso!!!");
            navigate("/");

        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.values(validationErrors).flat().join(", ");
                alert("Erro de validação: " + errorMessage);
            } else if (error.response && error.response.status === 401) {
                alert("Credenciais inválidas. Verifique seu e-mail e senha.");
            } else {
                alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <div className="register-container">
            <div className="overlay"></div>
            <div className="register-card">
                <h1>ClienteObra</h1>
                <p>Entre na sua conta para gerenciar construções</p>

                {/* Evento apenas aqui no onSubmit */}
                <form onSubmit={handleLogin}>
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

                    {/* Removido o onClick daqui */}
                    <button type="submit" className="Login-btn">
                        Entrar na conta
                    </button>
                </form>

                <span className="register-link">
                    Ainda não possui conta?
                    <Link to="/register"> Criar conta</Link>
                </span>
            </div>
        </div>
    );
}

export default Login;