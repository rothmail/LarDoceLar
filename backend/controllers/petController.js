// Controller de pets
const db = require('../config/database');

// Listar todos os pets (com filtros opcionais)
exports.getAllPets = async (req, res) => {
    try {
        const { especie, status, busca } = req.query;

        let query = `
      SELECT p.*, u.nome as responsavel_nome, u.email as responsavel_email, u.telefone as responsavel_telefone
      FROM pets p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE 1=1
    `;
        const params = [];

        if (especie) {
            query += ' AND p.especie = ?';
            params.push(especie);
        }

        if (status) {
            query += ' AND p.status = ?';
            params.push(status);
        } else {
            // Por padrão, mostrar apenas disponíveis
            query += ' AND p.status = ?';
            params.push('disponivel');
        }

        if (busca) {
            query += ' AND (p.nome LIKE ? OR p.especie LIKE ? OR p.raca LIKE ?)';
            const searchTerm = `%${busca}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        query += ' ORDER BY p.created_at DESC';

        const [pets] = await db.query(query, params);

        res.json(pets);
    } catch (error) {
        console.error('Erro ao listar pets:', error);
        res.status(500).json({ error: 'Erro ao listar pets' });
    }
};

// Buscar pet por ID
exports.getPetById = async (req, res) => {
    try {
        const { id } = req.params;

        const [pets] = await db.query(
            `SELECT p.*, u.nome as responsavel_nome, u.email as responsavel_email, 
       u.telefone as responsavel_telefone, u.endereco as responsavel_endereco
       FROM pets p
       JOIN usuarios u ON p.usuario_id = u.id
       WHERE p.id = ?`,
            [id]
        );

        if (pets.length === 0) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        res.json(pets[0]);
    } catch (error) {
        console.error('Erro ao buscar pet:', error);
        res.status(500).json({ error: 'Erro ao buscar pet' });
    }
};

// Criar novo pet (apenas abrigos)
exports.createPet = async (req, res) => {
    try {
        // Verificar se é abrigo
        if (req.userTipo !== 'abrigo') {
            return res.status(403).json({ error: 'Apenas abrigos podem cadastrar pets' });
        }

        const { nome, especie, raca, idade, descricao, imagem } = req.body;

        // Validações
        if (!nome || !especie || !idade) {
            return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
        }

        const [result] = await db.query(
            `INSERT INTO pets (nome, especie, raca, idade, descricao, imagem, usuario_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nome, especie, raca || null, idade, descricao || null, imagem || null, req.userId, 'disponivel']
        );

        res.status(201).json({
            message: 'Pet cadastrado com sucesso',
            id: result.insertId
        });
    } catch (error) {
        console.error('Erro ao criar pet:', error);
        res.status(500).json({ error: 'Erro ao cadastrar pet' });
    }
};

// Atualizar pet
exports.updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, especie, raca, idade, descricao, imagem, status } = req.body;

        // Verificar se o pet pertence ao usuário
        const [pets] = await db.query(
            'SELECT usuario_id FROM pets WHERE id = ?',
            [id]
        );

        if (pets.length === 0) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        if (pets[0].usuario_id !== req.userId) {
            return res.status(403).json({ error: 'Você não tem permissão para editar este pet' });
        }

        await db.query(
            `UPDATE pets 
       SET nome = ?, especie = ?, raca = ?, idade = ?, descricao = ?, imagem = ?, status = ?
       WHERE id = ?`,
            [nome, especie, raca, idade, descricao, imagem, status || 'disponivel', id]
        );

        res.json({ message: 'Pet atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar pet:', error);
        res.status(500).json({ error: 'Erro ao atualizar pet' });
    }
};

// Deletar pet
exports.deletePet = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar se o pet pertence ao usuário
        const [pets] = await db.query(
            'SELECT usuario_id FROM pets WHERE id = ?',
            [id]
        );

        if (pets.length === 0) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        if (pets[0].usuario_id !== req.userId) {
            return res.status(403).json({ error: 'Você não tem permissão para excluir este pet' });
        }

        await db.query('DELETE FROM pets WHERE id = ?', [id]);

        res.json({ message: 'Pet excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar pet:', error);
        res.status(500).json({ error: 'Erro ao deletar pet' });
    }
};

// Listar pets do usuário logado
exports.getMyPets = async (req, res) => {
    try {
        const [pets] = await db.query(
            'SELECT * FROM pets WHERE usuario_id = ? ORDER BY created_at DESC',
            [req.userId]
        );

        res.json(pets);
    } catch (error) {
        console.error('Erro ao listar meus pets:', error);
        res.status(500).json({ error: 'Erro ao listar seus pets' });
    }
};