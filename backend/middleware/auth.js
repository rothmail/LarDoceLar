// Middleware de autenticação JWT
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Pegar token do header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        // Formato: Bearer TOKEN
        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ error: 'Formato de token inválido' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Token mal formatado' });
        }

        // Verificar token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido' });
            }

            // Adicionar informações do usuário na requisição
            req.userId = decoded.id;
            req.userEmail = decoded.email;
            req.userTipo = decoded.tipo;

            return next();
        });
    } catch (error) {
        return res.status(401).json({ error: 'Erro na autenticação' });
    }
};

module.exports = authMiddleware;