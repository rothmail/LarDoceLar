// Funções de autenticação

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} - true se autenticado, false caso contrário
 */
function checkAuth() {
    const token = localStorage.getItem('token');
    return !!token;
}

/**
 * Realiza o login do usuário
 * @param {Event} event - Evento do formulário
 */
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    // Mostrar loading
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao fazer login');
        }

        // Salvar token e usuário
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        showToast('Login realizado com sucesso!', 'success');

        // Redirecionar para dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    } catch (error) {
        showToast(error.message, 'error');
        console.error('Erro no login:', error);
    } finally {
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }
}

/**
 * Registra um novo usuário
 * @param {Event} event - Evento do formulário
 */
async function handleRegister(event) {
    event.preventDefault();

    const nome = document.getElementById('register-nome').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const senha = document.getElementById('register-senha').value;
    const tipo = document.getElementById('register-tipo').value;

    if (senha.length < 6) {
        showToast('A senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }

    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay?.classList.remove('hidden');

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, tipo })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Erro do servidor:', data);
            throw new Error(data.error || `Erro ${response.status}: falha no cadastro`);
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        showToast('Conta criada com sucesso!', 'success');

        setTimeout(() => (window.location.href = 'dashboard.html'), 1000);
    } catch (error) {
        console.error('Erro no registro:', error);
        showToast(error.message, 'error');
    } finally {
        loadingOverlay?.classList.add('hidden');
    }
}

/**
 * Realiza o logout do usuário
 */
function handleLogout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showToast('Logout realizado com sucesso', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

/**
 * Obtém o usuário atual do localStorage
 * @returns {Object|null} - Dados do usuário ou null
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}