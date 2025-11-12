# 🐾 Lar Doce Lar - Plataforma de Adoção de Animais

Plataforma web para facilitar a adoção de animais, conectando abrigos/protetores com pessoas que desejam adotar pets.

## 📋 Sobre o Projeto

Este é um projeto de portfólio que demonstra uma aplicação web completa com:

- ✅ **CRUD completo** de pets
- ✅ **Sistema de autenticação** (login e cadastro)
- ✅ **Upload de arquivos** (fotos dos pets)
- ✅ **Banco de dados relacional** (MySQL)
- ✅ **5 telas responsivas**
- ✅ **API REST** completa
- ✅ **Código sem warnings** - todos os problemas foram corrigidos!

## 🆕 Últimas Atualizações

### Correções Implementadas (v1.0.1):
- ✅ Ordem de rotas corrigida (rotas específicas antes de `:id`)
- ✅ JSDoc adicionado em todos os arquivos JavaScript
- ✅ Script de verificação automática (`npm run check`)
- ✅ Configuração ESLint para backend e frontend
- ✅ Guia completo de troubleshooting
- ✅ Pasta uploads criada automaticamente
- ✅ Arquivo .env de exemplo atualizado

## 🎨 Paleta de Cores

- `#EEE5C2` - Bege claro (fundo)
- `#FAD564` - Amarelo (secundário)
- `#D3DC7C` - Verde claro (destaque)
- `#8EBD9D` - Verde (primário)
- `#1B475D` - Azul escuro (texto/header)

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Multer** - Upload de arquivos

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização (puro, sem frameworks)
- **JavaScript** - Funcionalidades (vanilla, sem frameworks)

## 📁 Estrutura do Projeto

```
lardocelar
├── backend/
│   ├── config/
│   │   └── database.js          # Conexão MySQL
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticação
│   │   └── petController.js     # Lógica de pets
│   ├── middleware/
│   │   ├── auth.js              # Middleware JWT
│   │   └── upload.js            # Middleware Multer
│   ├── routes/
│   │   ├── auth.js              # Rotas de autenticação
│   │   ├── pets.js              # Rotas de pets
│   │   └── upload.js            # Rotas de upload
│   ├── uploads/                 # Imagens enviadas
│   ├── .env.example             # Exemplo de variáveis de ambiente
│   ├── package.json             # Dependências
│   └── server.js                # Servidor principal
│
├── frontend/
│   ├── css/
│   │   └── styles.css           # Estilos globais
│   ├── js/
│   │   ├── api.js               # Funções de API
│   │   └── auth.js              # Funções de autenticação
│   ├── index.html               # Login/Cadastro
│   ├── dashboard.html           # Lista de pets
│   ├── cadastrar-pet.html       # Cadastro/Edição de pets
│   ├── detalhes-pet.html        # Detalhes do pet
│   └── perfil.html              # Perfil do usuário
│
├── database.sql                 # Script de criação do banco
└── README.md                    # Este arquivo
```

## 🚀 Como Executar

### 1. Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- Navegador web moderno

### 2. Configurar o Banco de Dados

```bash
# Acessar MySQL
mysql -u root -p

# Executar o script SQL
source database.sql

# Ou copiar e colar o conteúdo do arquivo database.sql no MySQL
```

### 3. Configurar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env baseado no .env.example
cp .env.example .env

# Editar o arquivo .env com suas configurações
nano .env  # ou use seu editor preferido
```

**Configurar o arquivo .env:**

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=lardocelar
DB_PORT=3306

JWT_SECRET=root

FRONTEND_URL=http://localhost:5500
```

### 4. Iniciar o Backend

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Ou modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

### 5. Configurar o Frontend

O frontend é composto de arquivos HTML/CSS/JS puros. Você pode:

**Opção 1: Usar um servidor HTTP simples**

```bash
# Entrar na pasta frontend
cd frontend

# Instalar http-server globalmente (se ainda não tiver)
npm install -g http-server

# Iniciar servidor
http-server -p 8080
```

**Opção 2: Usar Python**

```bash
cd frontend

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**Opção 3: Usar extensão do VS Code**

- Instalar a extensão "Live Server"
- Clicar com botão direito em `index.html`
- Selecionar "Open with Live Server"

### 6. Acessar a Aplicação

Abra o navegador e acesse: `http://localhost:8080`

## 👤 Usuários de Teste

Após executar o script SQL, você terá 2 usuários de teste:

**Abrigo:**
- Email: `abrigo@teste.com`
- Senha: `123456`

**Adotante:**
- Email: `joao@teste.com`
- Senha: `123456`

## 📱 Funcionalidades

### Para Adotantes:
- ✅ Visualizar pets disponíveis para adoção
- ✅ Buscar pets por nome, espécie ou raça
- ✅ Filtrar pets por espécie
- ✅ Ver detalhes completos do pet
- ✅ Acessar informações de contato do responsável
- ✅ Gerenciar perfil pessoal

### Para Abrigos/Protetores:
- ✅ Todas as funcionalidades de adotantes
- ✅ Cadastrar novos pets
- ✅ Editar informações dos pets
- ✅ Fazer upload de fotos
- ✅ Alterar status do pet (disponível/em processo/adotado)
- ✅ Excluir pets
- ✅ Visualizar todos os pets cadastrados

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Proteção de rotas sensíveis
- Validação de dados no backend
- Upload seguro de imagens com validação de tipo e tamanho
- CORS configurado

## 📊 Banco de Dados

### Tabela: usuarios
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- nome (VARCHAR)
- email (VARCHAR, UNIQUE)
- senha (VARCHAR) - hash bcrypt
- tipo (ENUM: 'adotante', 'abrigo')
- telefone (VARCHAR)
- endereco (TEXT)
- foto_perfil (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Tabela: pets
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- nome (VARCHAR)
- especie (VARCHAR)
- raca (VARCHAR)
- idade (VARCHAR)
- descricao (TEXT)
- imagem (VARCHAR)
- status (ENUM: 'disponivel', 'em_processo', 'adotado')
- usuario_id (INT, FOREIGN KEY)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## 🌐 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil (autenticado)
- `PUT /api/auth/profile` - Atualizar perfil (autenticado)

### Pets
- `GET /api/pets` - Listar todos os pets
- `GET /api/pets/:id` - Obter pet por ID
- `POST /api/pets` - Criar pet (autenticado - apenas abrigos)
- `PUT /api/pets/:id` - Atualizar pet (autenticado)
- `DELETE /api/pets/:id` - Excluir pet (autenticado)
- `GET /api/pets/user/my-pets` - Listar meus pets (autenticado)

### Upload
- `POST /api/upload` - Upload de imagem (autenticado)

## 🎯 Melhorias Futuras

- [ ] Recuperação de senha
- [ ] Sistema de favoritos
- [ ] Chat entre adotantes e abrigos
- [ ] Sistema de avaliações
- [ ] Notificações por email
- [ ] Integração com redes sociais
- [ ] Painel administrativo
- [ ] Relatórios e estatísticas
- [ ] Mapa com localização dos abrigos

## 📝 Licença

Este é um projeto de portfólio para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como projeto de portfólio.

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verifique se o MySQL está rodando
2. Verifique se as credenciais no .env estão corretas
3. Verifique se a porta 3000 (backend) e 8080 (frontend) estão livres
4. Veja os logs do servidor para mensagens de erro
5. Verifique o console do navegador para erros no frontend

---

Feito com 💚 para ajudar pets a encontrarem seu lar doce lar! 🐾
