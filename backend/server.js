// Servidor Express - Lar Doce Lar
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/upload', require('./routes/upload'));

// Rota de teste
app.get('/', (req, res) => {
    res.json({
        message: 'API Lar Doce Lar - Plataforma de Adoção de Animais',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            pets: '/api/pets',
            upload: '/api/upload'
        }
    });
});

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: err.message || 'Erro interno do servidor'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
🐾 ========================================
   Servidor Lar Doce Lar
   Rodando em: http://localhost:${PORT}
   Ambiente: ${process.env.NODE_ENV || 'development'}
========================================
  `);
});

module.exports = app;