// Configuração da API
const API_URL = 'http://localhost:3000/api';

/**
 * Exibe uma notificação toast
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da mensagem (info, success, error)
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

/**
 * Faz requisições HTTP com autenticação
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @returns {Promise<Response>} - Resposta da requisição
 */
async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Se não autorizado, redirecionar para login
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
        throw new Error('Sessão expirada');
    }

    return response;
}

/**
 * Obtém o perfil do usuário autenticado
 * @returns {Promise<Object>} - Dados do usuário
 */
async function getProfile() {
    try {
        const response = await fetchWithAuth(`${API_URL}/auth/profile`);

        if (!response.ok) {
            throw new Error('Erro ao carregar perfil');
        }

        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        console.error('Erro ao obter perfil:', error);
        throw error;
    }
}