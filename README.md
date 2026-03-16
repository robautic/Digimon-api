# 🦕 Digimon API

API REST desenvolvida em Node.js puro, sem frameworks, para gerenciamento completo de Digimons.

Projeto desenvolvido como desafio prático após concluir o módulo de fundamentos de Node.js.

## 🚀 Tecnologias

- Node.js
- JavaScript (ES Modules)
- csv-parse
- Nodemon

## 📋 Funcionalidades

- Cadastrar um Digimon
- Listar todos os Digimons com filtro por nome e tipo
- Atualizar nome e tipo de um Digimon
- Remover um Digimon
- Marcar/desmarcar um Digimon como evoluído
- Importar Digimons em massa via arquivo CSV

## 🗂️ Estrutura do projeto

```
digimon-api/
  src/
    utils/
      build-route-path.js
    middlewares/
      json.js
    database.js
    routes.js
    server.js
  import-csv.js
  digimons.csv
  package.json
```

## ⚙️ Como rodar

Clone o repositório:

```bash
git clone https://github.com/robautic/Digimon-api.git
cd Digimon-api
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3335`

## 📡 Rotas

### Cadastrar Digimon
```
POST /digimons
```
Body:
```json
{
  "name": "Agumon",
  "type": "Vaccine"
}
```

### Listar Digimons
```
GET /digimons
```

Filtros opcionais:
```
GET /digimons?name=agumon
GET /digimons?type=vaccine
```

### Atualizar Digimon
```
PUT /digimons/:id
```
Body:
```json
{
  "name": "Greymon",
  "type": "Vaccine"
}
```

### Remover Digimon
```
DELETE /digimons/:id
```

### Marcar como evoluído
```
PATCH /digimons/:id/evolve
```

## 📥 Importação via CSV

Com o servidor rodando, abra um segundo terminal e execute:

```bash
node import-csv.js
```

O arquivo `digimons.csv` deve seguir o formato:

```
name,type
Agumon,Vaccine
Gabumon,Data
```

## 📝 Estrutura de um Digimon

| Campo | Descrição |
|-------|-----------|
| id | Identificador único gerado automaticamente |
| name | Nome do Digimon |
| type | Tipo: Vaccine, Data ou Virus |
| evolved_at | Data de evolução, inicia como null |
| created_at | Data de criação |
| updated_at | Data da última atualização |
