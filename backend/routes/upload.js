// Rotas de upload de arquivos
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// Upload de imagem (protegido)
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado' });
        }

        // Retornar URL da imagem
        const imageUrl = `/uploads/${req.file.filename}`;

        res.json({
            message: 'Imagem enviada com sucesso',
            url: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    }
});

module.exports = router;