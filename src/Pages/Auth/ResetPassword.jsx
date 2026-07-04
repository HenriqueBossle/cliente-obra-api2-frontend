import { useState } from "react";
import api from "../../Api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Register.css";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    // Pré-preenche o e-mail se vier via state do ForgotPassword
    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        otp: "",
        password: "",
        password_confirmation: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.password_confirmation) {
            setError("As senhas não coincidem. Verifique e tente novamente.");
            return;
        }

        if (formData.password.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        setIsLoading(true);

        try {
            await api.post("/auth/reset-password", {
                email: formData.email,
                otp: formData.otp,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            });

            setSuccess(true);

            // Redireciona para o login após 2s
            setTimeout(() => {
                navigate("/login");
            }, 2000);
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
                    {success ? "Senha redefinida!" : "Redefina sua senha"}
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
                            Sua senha foi redefinida com sucesso.<br />
                            Redirecionando para o login...
                        </p>
                        <Link to="/login" className="register-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
                            Ir para login
                        </Link>
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
                                        placeholder="E-mail"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="Código recebido por e-mail"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        required
                                        autoComplete="one-time-code"
                                        inputMode="numeric"
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Nova senha"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>

                                <div className="input-group">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="password_confirmation"
                                        placeholder="Confirmar nova senha"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                            </fieldset>

                            <button type="submit" className="register-btn" disabled={isLoading}>
                                {isLoading ? "Redefinindo..." : "Redefinir senha"}
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

export default ResetPassword;
