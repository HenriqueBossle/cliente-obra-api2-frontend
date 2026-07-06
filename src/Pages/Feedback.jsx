import { useState } from "react";
import api from "../Api/api";
import "./Feedback.css";

function Feedback() {
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });

    const [data, setData] = useState({
        title: "",
        message: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setFeedback({ type: "", message: "" });

        // Client-side validation
        if (!data.title.trim()) {
            setFeedback({ type: "error", message: "O campo Título é obrigatório." });
            return;
        }

        if (!data.message.trim()) {
            setFeedback({ type: "error", message: "O campo Mensagem é obrigatório." });
            return;
        }

        try {
            setIsLoading(true);

            await api.post("/feedback", data, {
                headers: {
                    Accept: "application/json"
                }
            });

            setFeedback({
                type: "success",
                message: "Feedback enviado com sucesso! Obrigado pela sua contribuição."
            });

            // Reset form fields
            setData({ title: "", message: "" });

            // Auto clear success message after 5 seconds
            setTimeout(() => {
                setFeedback({ type: "", message: "" });
            }, 5000);
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.values(validationErrors).flat().join(", ");
                setFeedback({ type: "error", message: `Erro de validação: ${errorMessage}` });
            } else {
                setFeedback({
                    type: "error",
                    message: "Ocorreu um erro ao enviar o feedback. Tente novamente mais tarde."
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="feedback-container">
            <div className="overlay"></div>

            <div className="feedback-card">
                <h1>Feedback</h1>
                <p>Envie sua opinião, sugestão ou relato de problema</p>

                {feedback.message && (
                    <div className={`feedback-alert ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="feedback-form">
                    <fieldset disabled={isLoading} style={{ border: "none", padding: 0, margin: 0 }}>
                        <div className="feedback-input-group">
                            <label htmlFor="feedback-title">Título</label>
                            <input
                                type="text"
                                id="feedback-title"
                                name="title"
                                placeholder="Resuma seu feedback em poucas palavras"
                                value={data.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="feedback-input-group">
                            <label htmlFor="feedback-message">Mensagem</label>
                            <textarea
                                id="feedback-message"
                                name="message"
                                placeholder="Descreva detalhadamente sua opinião, sugestão ou problema encontrado..."
                                value={data.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </fieldset>

                    <button type="submit" disabled={isLoading}>
                        {isLoading && <span className="feedback-spinner"></span>}
                        {isLoading ? "Enviando..." : "Enviar Feedback"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;
