import { useState } from "react";
import api from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showSenha, setShowSenha] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [showResend, setShowResend] = useState(false);
    const [resending, setResending] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResendVerification = async () => {
        if (!formData.email) {
            alert("Insira seu e-mail para reenviar a verificação.");
            return;
        }
        setResending(true);
        try {
            const response = await api.post('/email/resend-verification', {
                email: formData.email
            });
            alert(response.data.message || "E-mail de verificação reenviado com sucesso.");
            setError(null);
            setShowResend(false);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert("Erro: " + err.response.data.message);
            } else {
                alert("Erro ao reenviar e-mail de verificação. Tente novamente.");
            }
        } finally {
            setResending(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);
        setShowResend(false);

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
            if (error.response && error.response.status === 403) {
                setError(error.response.data.message || "Verifique seu e-mail antes de fazer login.");
                setShowResend(true);
            } else if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.values(validationErrors).flat().join(", ");
                setError("Erro de validação: " + errorMessage);
            } else if (error.response && error.response.status === 401) {
                setError("Credenciais inválidas. Verifique seu e-mail e senha.");
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="register-container">
            <div className="overlay"></div>
            <div className="register-card">
                <h1>ClienteObra</h1>
                <p>Entre na sua conta para gerenciar suas obras</p>

                {error && (
                    <div className="login-error-message" style={{
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        color: '#e74c3c',
                        padding: '12px',
                        borderRadius: 'var(--border-radius-sm)',
                        marginBottom: '15px',
                        fontSize: '0.9rem',
                        borderLeft: '4px solid #e74c3c',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        textAlign: 'left'
                    }}>
                        <span>{error}</span>
                        {showResend && (
                            <button
                                type="button"
                                onClick={handleResendVerification}
                                disabled={resending}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--construction-orange-hover)',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    padding: 0,
                                    textAlign: 'left',
                                    fontSize: '0.85rem'
                                }}
                            >
                                {resending ? "Reenviando..." : "Reenviar e-mail de verificação"}
                            </button>
                        )}
                    </div>
                )}

                {/* Evento apenas aqui no onSubmit */}
                <form onSubmit={handleLogin}>
                    <fieldset disabled={isLoading}>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                    </fieldset>

                    <div style={{ textAlign: 'right', marginBottom: '12px', marginTop: '-6px' }}>
                        <Link
                            to="/forgot-password"
                            style={{
                                color: 'var(--construction-orange-hover)',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-body)',
                            }}
                        >
                            Esqueci minha senha?
                        </Link>
                    </div>

                    {/* Removido o onClick daqui */}
                    <button type="submit" className="Login-btn" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Entrar na conta"}
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