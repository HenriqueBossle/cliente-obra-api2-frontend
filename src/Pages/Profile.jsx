import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    // Loading states
    const [loading, setLoading] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);

    // User details state
    const [user, setUser] = useState({ id: null, name: "", email: "" });

    // Forms state
    const [profileForm, setProfileForm] = useState({ name: "", email: "" });
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: ""
    });
    const [deleteConfirmPassword, setDeleteConfirmPassword] = useState("");
    
    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Feedback messages state
    const [profileFeedback, setProfileFeedback] = useState({ type: "", message: "" });
    const [passwordFeedback, setPasswordFeedback] = useState({ type: "", message: "" });
    const [deleteFeedback, setDeleteFeedback] = useState({ type: "", message: "" });

    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await api.get("/profile", {
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (response.data && response.data.status && response.data.user) {
                    const userData = response.data.user;
                    setUser(userData);
                    setProfileForm({
                        name: userData.name || "",
                        email: userData.email || ""
                    });
                } else {
                    throw new Error("Formato de resposta inválido do servidor");
                }
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
                setProfileFeedback({
                    type: "error",
                    message: "Não foi possível carregar as informações do perfil. Tente novamente mais tarde."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle profile form inputs
    const handleProfileChange = (e) => {
        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value
        });
    };

    // Update profile info (Name & Email)
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileFeedback({ type: "", message: "" });

        if (!profileForm.name.trim() || !profileForm.email.trim()) {
            setProfileFeedback({ type: "error", message: "Os campos Nome e E-mail são obrigatórios." });
            return;
        }

        try {
            setUpdatingProfile(true);
            const response = await api.put("/profile", profileForm, {
                headers: {
                    Accept: "application/json"
                }
            });

            // Update local user state
            if (response.data && response.data.user) {
                setUser(response.data.user);
            } else {
                setUser({
                    ...user,
                    name: profileForm.name,
                    email: profileForm.email
                });
            }

            setProfileFeedback({
                type: "success",
                message: "Perfil atualizado com sucesso!"
            });

            // Auto clear success message after 5 seconds
            setTimeout(() => {
                setProfileFeedback({ type: "", message: "" });
            }, 5000);
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.values(validationErrors).flat().join(", ");
                setProfileFeedback({ type: "error", message: `Erro de validação: ${errorMessage}` });
            } else {
                setProfileFeedback({
                    type: "error",
                    message: "Ocorreu um erro ao atualizar o perfil. Tente novamente."
                });
            }
        } finally {
            setUpdatingProfile(false);
        }
    };

    // Handle password form inputs
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };

    // Update password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordFeedback({ type: "", message: "" });

        // Simple validation checks
        if (!passwordForm.current_password) {
            setPasswordFeedback({ type: "error", message: "A senha atual é obrigatória." });
            return;
        }
        if (passwordForm.password.length < 8) {
            setPasswordFeedback({ type: "error", message: "A nova senha deve ter pelo menos 8 caracteres." });
            return;
        }
        if (passwordForm.password !== passwordForm.password_confirmation) {
            setPasswordFeedback({ type: "error", message: "A confirmação da nova senha não confere." });
            return;
        }

        try {
            setUpdatingPassword(true);
            await api.put("/profile/password", passwordForm, {
                headers: {
                    Accept: "application/json"
                }
            });

            setPasswordFeedback({
                type: "success",
                message: "Senha alterada com sucesso!"
            });

            // Reset password fields
            setPasswordForm({
                current_password: "",
                password: "",
                password_confirmation: ""
            });

            // Auto clear success message after 5 seconds
            setTimeout(() => {
                setPasswordFeedback({ type: "", message: "" });
            }, 5000);
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.values(validationErrors).flat().join(", ");
                setPasswordFeedback({ type: "error", message: `Erro de validação: ${errorMessage}` });
            } else if (error.response && error.response.status === 400) {
                setPasswordFeedback({ type: "error", message: error.response.data.message || "A senha atual está incorreta." });
            } else {
                setPasswordFeedback({
                    type: "error",
                    message: "Erro ao alterar a senha. Verifique a senha atual e tente novamente."
                });
            }
        } finally {
            setUpdatingPassword(false);
        }
    };

    // Account Deletion Flow
    const openDeleteModal = () => {
        setDeleteConfirmPassword("");
        setDeleteFeedback({ type: "", message: "" });
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (!deletingAccount) {
            setShowDeleteModal(false);
            setDeleteConfirmPassword("");
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setDeleteFeedback({ type: "", message: "" });

        if (!deleteConfirmPassword) {
            setDeleteFeedback({ type: "error", message: "Por favor, digite sua senha para prosseguir." });
            return;
        }

        try {
            setDeletingAccount(true);
            
            // Laravel DELETE method allows payload with data, or we can send it in headers/data block in axios config
            await api.delete("/profile", {
                data: {
                    password: deleteConfirmPassword
                },
                headers: {
                    Accept: "application/json"
                }
            });

            // Clean login/token states
            localStorage.removeItem("token");
            if (logout) {
                logout();
            }

            alert("Sua conta foi excluída definitivamente.");
            setShowDeleteModal(false);
            navigate("/login");
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.values(validationErrors).flat().join(", ");
                setDeleteFeedback({ type: "error", message: `Erro: ${errorMessage}` });
            } else if (error.response && error.response.status === 401) {
                setDeleteFeedback({ type: "error", message: "Senha incorreta. A conta não pôde ser excluída." });
            } else if (error.response && error.response.data && error.response.data.message) {
                setDeleteFeedback({ type: "error", message: error.response.data.message });
            } else {
                setDeleteFeedback({
                    type: "error",
                    message: "Senha incorreta ou erro no servidor. Tente novamente."
                });
            }
        } finally {
            setDeletingAccount(false);
        }
    };

    // Helper to get initials for avatar
    const getInitials = (name) => {
        if (!name) return "U";
        return name.trim().charAt(0).toUpperCase();
    };

    return (
        <div className="profile-container">
            <div className="overlay"></div>

            <div className="profile-content">
                <div className="profile-header">
                    <h1>Meu Perfil</h1>
                    <p>Gerencie suas informações cadastrais e segurança da conta</p>
                </div>

                {loading ? (
                    <div className="profile-loading-screen">
                        <div className="spinner"></div>
                        <p>Carregando dados do perfil...</p>
                    </div>
                ) : (
                    <div className="profile-grid">
                        
                        {/* Section 1: Profile Info Card */}
                        <div className="profile-card">
                            <div>
                                <h2>Informações do Perfil</h2>
                                
                                <div className="avatar-container">
                                    <div className="profile-avatar">
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="user-current-info">
                                        <div className="user-current-name">{user.name}</div>
                                        <div className="user-current-email">{user.email}</div>
                                    </div>
                                </div>

                                {profileFeedback.message && (
                                    <div className={`profile-alert ${profileFeedback.type}`}>
                                        {profileFeedback.message}
                                    </div>
                                )}

                                <form onSubmit={handleProfileSubmit} className="profile-form">
                                    <div className="profile-input-group">
                                        <label htmlFor="name">Nome Completo</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={profileForm.name}
                                            onChange={handleProfileChange}
                                            placeholder="Digite seu nome completo"
                                            disabled={updatingProfile}
                                            required
                                        />
                                    </div>

                                    <div className="profile-input-group">
                                        <label htmlFor="email">Endereço de E-mail</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={profileForm.email}
                                            onChange={handleProfileChange}
                                            placeholder="Digite seu e-mail"
                                            disabled={updatingProfile}
                                            required
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="profile-btn" 
                                        disabled={updatingProfile}
                                    >
                                        {updatingProfile ? "Salvando..." : "Salvar Alterações"}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Section 2: Change Password Card */}
                        <div className="profile-card">
                            <div>
                                <h2>Alterar Senha</h2>

                                {passwordFeedback.message && (
                                    <div className={`profile-alert ${passwordFeedback.type}`}>
                                        {passwordFeedback.message}
                                    </div>
                                )}

                                <form onSubmit={handlePasswordSubmit} className="profile-form">
                                    <div className="profile-input-group">
                                        <label htmlFor="current_password">Senha Atual</label>
                                        <input
                                            type="password"
                                            id="current_password"
                                            name="current_password"
                                            value={passwordForm.current_password}
                                            onChange={handlePasswordChange}
                                            placeholder="Sua senha atual"
                                            disabled={updatingPassword}
                                            required
                                        />
                                    </div>

                                    <div className="profile-input-group">
                                        <label htmlFor="password">Nova Senha</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={passwordForm.password}
                                            onChange={handlePasswordChange}
                                            placeholder="Mínimo 8 caracteres"
                                            disabled={updatingPassword}
                                            required
                                        />
                                    </div>

                                    <div className="profile-input-group">
                                        <label htmlFor="password_confirmation">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={passwordForm.password_confirmation}
                                            onChange={handlePasswordChange}
                                            placeholder="Repita a nova senha"
                                            disabled={updatingPassword}
                                            required
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="profile-btn" 
                                        disabled={updatingPassword}
                                    >
                                        {updatingPassword ? "Alterando..." : "Alterar Senha"}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Section 3: Danger Zone Card */}
                        <div className="profile-card danger-card">
                            <h2>Zona de Perigo</h2>
                            <div className="danger-info">
                                <p>A exclusão de conta é uma ação permanente e irreversível.</p>
                                <div className="danger-warning-box">
                                    Atenção: Ao excluir sua conta, todas as suas construções e registros serão excluídos permanentemente de nossos sistemas.
                                </div>
                            </div>
                            <button onClick={openDeleteModal} className="danger-btn">
                                Excluir Conta
                            </button>
                        </div>

                    </div>
                )}
            </div>

            {/* Account Deletion Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-backdrop" onClick={closeDeleteModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-icon">⚠️</span>
                            <h3>Excluir Conta Permanentemente?</h3>
                        </div>

                        <div className="modal-body">
                            <p>
                                Esta ação <strong>NÃO</strong> pode ser desfeita. Por favor, confirme que deseja excluir permanentemente sua conta e todos os dados associados.
                            </p>
                            
                            {deleteFeedback.message && (
                                <div className={`profile-alert ${deleteFeedback.type}`}>
                                    {deleteFeedback.message}
                                </div>
                            )}

                            <form onSubmit={handleDeleteAccount}>
                                <div className="modal-input-group">
                                    <label htmlFor="confirmPassword">
                                        Para confirmar, digite sua senha atual abaixo:
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={deleteConfirmPassword}
                                        onChange={(e) => setDeleteConfirmPassword(e.target.value)}
                                        placeholder="Digite sua senha"
                                        disabled={deletingAccount}
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="modal-cancel-btn"
                                        onClick={closeDeleteModal}
                                        disabled={deletingAccount}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="modal-confirm-btn"
                                        disabled={deletingAccount || !deleteConfirmPassword}
                                    >
                                        {deletingAccount ? "Excluindo..." : "Excluir Definitivamente"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
