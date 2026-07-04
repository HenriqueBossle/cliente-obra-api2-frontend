import { useState } from "react";
import api from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/forgot-password", { email });
            setSuccess(true);

            // Redireciona após 1.5s para a tela de redefinição, passando o e-mail
            setTimeout(() => {
                navigate("/reset-password", { state: { email } });
            }, 1500);
        } catch (err) {
            if (err.response?.status === 422) {
                const msgs = Object.values(err.response.data.errors).flat().join(", ");
                setError("Erro de validação: " + msgs);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="overlay"></div>
            <div className="register-card">
                <h1>ClienteObra</h1>
                <p>
                    {success
                        ? "Código enviado!"
                        : "Informe seu e-mail para receber o código de redefinição"}
                </p>

                {success ? (
                    <div style={{ textAlign: "center", padding: "10px 0" }}>
                        <div style={{ fontSize: "3.5rem", color: "var(--construction-orange)", marginBottom: "15px" }}>
                            ✓
                        </div>
                        <p style={{
                            color: "var(--construction-dark)",
                            fontWeight: "500",
                            fontSize: "1.05rem",
                            lineHeight: "1.6",
                            marginBottom: "25px"
                        }}>
                            Um código OTP foi enviado para <strong>{email}</strong>.<br />
                            Redirecionando para a próxima etapa...
                        </p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div style={{
                                backgroundColor: "rgba(231, 76, 60, 0.1)",
                                color: "#e74c3c",
                                padding: "12px",
                                borderRadius: "var(--border-radius-sm)",
                                marginBottom: "15px",
                                fontSize: "0.9rem",
                                borderLeft: "4px solid #e74c3c",
                                textAlign: "left"
                            }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <fieldset disabled={isLoading}>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Seu e-mail cadastrado"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </fieldset>

                            <button type="submit" className="register-btn" disabled={isLoading}>
                                {isLoading ? "Enviando..." : "Enviar código"}
                            </button>
                        </form>

                        <span className="login-link">
                            Lembrou a senha?
                            <Link to="/login">Entrar</Link>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
