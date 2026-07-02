import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import api from "../../Api/api";
import "./Register.css";

function EmailVerificado() {
    const { id: routeId, hash: routeHash } = useParams();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("verifying"); // verifying, success, error
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verify = async () => {
            const id = routeId || searchParams.get("id");
            const hash = routeHash || searchParams.get("hash");
            const signature = searchParams.get("signature");

            if (!id || !hash || !signature) {
                // Se não há parâmetros de verificação, assume que já foi verificado
                // e o usuário simplesmente foi redirecionado para cá.
                setStatus("success");
                setMessage("E-mail verificado com sucesso.");
                return;
            }

            try {
                // Faz a requisição de verificação ao backend
                const response = await api.get(`/verify-email/${id}/${hash}`, {
                    params: Object.fromEntries(searchParams.entries())
                });
                setStatus("success");
                setMessage(response.data.message || "E-mail verificado com sucesso.");
            } catch (error) {
                setStatus("error");
                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Link de verificação inválido ou expirado.");
                }
            }
        };

        verify();
    }, [routeId, routeHash, searchParams]);

    return (
        <div className="register-container">
            <div className="overlay"></div>
            <div className="register-card">
                <h1>ClienteObra</h1>
                
                {status === "verifying" && (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div className="loading-spinner" style={{
                            border: "4px solid rgba(0, 0, 0, 0.1)",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            borderLeftColor: "var(--construction-orange)",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 15px auto"
                        }}></div>
                        <p style={{ color: "var(--construction-steel)" }}>Verificando seu e-mail, por favor aguarde...</p>
                        
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                )}

                {status === "success" && (
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", color: "var(--construction-orange)", marginBottom: "15px" }}>✓</div>
                        <p style={{ color: "var(--construction-dark)", fontWeight: "500", fontSize: "1.15rem", marginBottom: "25px" }}>
                            {message}
                        </p>
                        <Link to="/login" className="register-btn" style={{ textDecoration: "none" }}>
                            Ir para login
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", color: "#e74c3c", marginBottom: "15px" }}>✗</div>
                        <p style={{ color: "var(--construction-dark)", fontWeight: "500", fontSize: "1.1rem", marginBottom: "25px" }}>
                            {message}
                        </p>
                        <Link to="/login" className="register-btn" style={{ textDecoration: "none", backgroundColor: "#e74c3c" }}>
                            Ir para login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmailVerificado;
