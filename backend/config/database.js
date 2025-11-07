// Configuração da conexão com MySQL
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'lardocelar',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testar conexão
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log('✅ MySQL conectado com sucesso!');
        conn.release();
    } catch (err) {
        console.error('❌ Erro ao conectar ao MySQL:', err.message);
    }
})();

module.exports = pool;