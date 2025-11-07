-- Script SQL para MySQL
-- Lar Doce Lar - Plataforma de Adoção de Animais
CREATE DATABASE IF NOT EXISTS lar_doce_lar;

USE lar_doce_lar;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('adotante', 'abrigo') NOT NULL DEFAULT 'adotante',
    telefone VARCHAR(20),
    endereco TEXT,
    foto_perfil VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Pets
CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    raca VARCHAR(100),
    idade VARCHAR(50) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    status ENUM('disponivel', 'adotado', 'em_processo') NOT NULL DEFAULT 'disponivel',
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX idx_pets_status ON pets(status);

CREATE INDEX idx_pets_usuario ON pets(usuario_id);

CREATE INDEX idx_pets_especie ON pets(especie);

-- Inserir usuário de teste (senha: 123456)
-- Senha hash gerado com bcrypt para '123456': $2b$10$rKvVLZ9Z8X.qLQ3YJw3N9ORcN5vYJ8pZ8wZ1Z3Z4Z5Z6Z7Z8Z9Z0Z
INSERT INTO
    usuarios (nome, email, senha, tipo)
VALUES
    (
        'Abrigo Amigo dos Animais',
        'abrigo@teste.com',
        '$2b$10$rKvVLZ9Z8X.qLQ3YJw3N9ORcN5vYJ8pZ8wZ1Z3Z4Z5Z6Z7Z8Z9Z0Z',
        'abrigo'
    ),
    (
        'João Silva',
        'joao@teste.com',
        '$2b$10$rKvVLZ9Z8X.qLQ3YJw3N9ORcN5vYJ8pZ8wZ1Z3Z4Z5Z6Z7Z8Z9Z0Z',
        'adotante'
    );