// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configurar armazenamento (salva em /uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Rota para upload de imagem
router.post('/', upload.single('imagem'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ path: imagePath });
});

module.exports = router;