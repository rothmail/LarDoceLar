#!/usr/bin/env node

/**
 * Script para verificar se o ambiente está configurado corretamente
 * Execute: node check-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verificando configuração do ambiente...\n');

let hasErrors = false;
const warnings = [];

// 1. Verificar Node.js
console.log('✓ Node.js:', process.version);

// 2. Verificar se package.json existe
if (!fs.existsSync('./package.json')) {
    console.error('❌ package.json não encontrado!');
    hasErrors = true;
} else {
    console.log('✓ package.json encontrado');
}

// 3. Verificar se node_modules existe
if (!fs.existsSync('./node_modules')) {
    console.error('❌ node_modules não encontrado! Execute: npm install');
    hasErrors = true;
} else {
    console.log('✓ node_modules encontrado');
}

// 4. Verificar se .env existe
if (!fs.existsSync('./.env')) {
    console.error('❌ Arquivo .env não encontrado!');
    console.log('   Copie .env.example para .env e configure as variáveis');
    hasErrors = true;
} else {
    console.log('✓ Arquivo .env encontrado');

    // Verificar variáveis importantes
    require('dotenv').config();

    const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
    const missingVars = [];

    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    });

    if (missingVars.length > 0) {
        console.error('❌ Variáveis de ambiente faltando:', missingVars.join(', '));
        hasErrors = true;
    } else {
        console.log('✓ Variáveis de ambiente configuradas');
    }

    // Avisos
    if (process.env.JWT_SECRET === 'root') {
        warnings.push('⚠️  JWT_SECRET está usando o valor padrão. Altere para produção!');
    }

    if (process.env.DB_PASSWORD === 'root' || process.env.DB_PASSWORD === '') {
        warnings.push('⚠️  DB_PASSWORD não configurado. Verifique a senha do MySQL!');
    }
}

// 5. Verificar estrutura de pastas
const requiredDirs = [
    './config',
    './controllers',
    './middleware',
    './routes',
    './uploads'
];

requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        console.error(`❌ Pasta ${dir} não encontrada!`);
        if (dir === './uploads') {
            console.log('   Criando pasta uploads...');
            fs.mkdirSync(dir, { recursive: true });
            console.log('   ✓ Pasta uploads criada');
        } else {
            hasErrors = true;
        }
    } else {
        console.log(`✓ Pasta ${dir} encontrada`);
    }
});

// 6. Verificar arquivos essenciais
const requiredFiles = [
    './server.js',
    './config/database.js',
    './controllers/authController.js',
    './controllers/petController.js',
    './middleware/auth.js',
    './middleware/upload.js',
    './routes/auth.js',
    './routes/pets.js',
    './routes/upload.js'
];

requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.error(`❌ Arquivo ${file} não encontrado!`);
        hasErrors = true;
    }
});

console.log('✓ Todos os arquivos essenciais encontrados\n');

// 7. Testar conexão MySQL (se possível)
if (!hasErrors) {
    console.log('🔌 Testando conexão com MySQL...\n');

    try {
        const db = require('./config/database');

        db.query('SELECT 1')
            .then(() => {
                console.log('✅ Conexão com MySQL: OK\n');

                // Verificar se banco existe
                return db.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${process.env.DB_NAME}'`);
            })
            .then(([results]) => {
                if (results.length === 0) {
                    console.error(`❌ Banco de dados '${process.env.DB_NAME}' não encontrado!`);
                    console.log('   Execute o script database.sql no MySQL\n');
                    hasErrors = true;
                } else {
                    console.log(`✓ Banco de dados '${process.env.DB_NAMEF}' encontrado`);

                    // Verificar tabelas
                    return db.query('SHOW TABLES');
                }
            })
            .then(([results]) => {
                if (results && results.length >= 2) {
                    console.log('✓ Tabelas encontradas:', results.length);
                    results.forEach(row => {
                        console.log('  -', Object.values(row)[0]);
                    });
                }

                printSummary();
            })
            .catch(err => {
                console.error('❌ Erro ao conectar com MySQL:', err.message);
                console.log('\n📝 Verifique:');
                console.log('   1. MySQL está rodando?');
                console.log('   2. Credenciais no .env estão corretas?');
                console.log('   3. Banco de dados foi criado? (database.sql)\n');
                hasErrors = true;
                printSummary();
            });
    } catch (err) {
        console.error('❌ Erro ao carregar módulo database:', err.message);
        hasErrors = true;
        printSummary();
    }
} else {
    printSummary();
}

function printSummary() {
    console.log('\n' + '='.repeat(50));

    if (warnings.length > 0) {
        console.log('\n⚠️  AVISOS:\n');
        warnings.forEach(w => console.log(w));
    }

    if (hasErrors) {
        console.log('\n❌ VERIFICAÇÃO FALHOU!');
        console.log('\nCorrija os erros acima antes de iniciar o servidor.\n');
        process.exit(1);
    } else {
        console.log('\n✅ TUDO CONFIGURADO CORRETAMENTE!\n');
        console.log('Você pode iniciar o servidor com:');
        console.log('  npm start      (modo produção)');
        console.log('  npm run dev    (modo desenvolvimento)\n');
        process.exit(0);
    }
}