// Controller de autenticação
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Registrar novo usuário
exports.register = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        // Validações
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
        }

        if (!['adotante', 'abrigo'].includes(tipo)) {
            return res.status(400).json({ error: 'Tipo de usuário inválido' });
        }

        // Verificar se email já existe
        const [existingUser] = await db.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir usuário
        const [result] = await db.query(
            'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
            [nome, email, hashedPassword, tipo]
        );

        // Gerar token
        const token = jwt.sign(
            { id: result.insertId, email, tipo },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
            token,
            user: {
                id: result.insertId,
                nome,
                email,
                tipo
            }
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validações
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Buscar usuário
        const [users] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const user = users[0];

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Gerar token
        const token = jwt.sign(
            { id: user.id, email: user.email, tipo: user.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                tipo: user.tipo,
                telefone: user.telefone,
                endereco: user.endereco,
                foto_perfil: user.foto_perfil
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

// Obter dados do usuário logado
exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, nome, email, tipo, telefone, endereco, foto_perfil FROM usuarios WHERE id = ?',
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
};

// Atualizar perfil
exports.updateProfile = async (req, res) => {
    try {
        const { nome, telefone, endereco } = req.body;

        await db.query(
            'UPDATE usuarios SET nome = ?, telefone = ?, endereco = ? WHERE id = ?',
            [nome, telefone, endereco, req.userId]
        );

        res.json({ message: 'Perfil atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
};