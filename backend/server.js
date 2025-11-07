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

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/auth', require('./routes/auth'));
// (Futuras rotas de pets/upload também aqui)

// Rota base
app.get('/', (req, res) => {
    res.json({
        message: 'API Lar Doce Lar - Plataforma de Adoção de Animais',
        version: '1.0.0'
    });
});

// Erros 404
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

// Erros gerais
app.use((err, req, res, next) => {
    console.error('Erro global:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
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