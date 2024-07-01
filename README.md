# TaskFlow v1.0.0

### Aplicação para gerenciamento de projetos e tarefas com backend em NodeJS e frontend em ReactJS. Permite criar, listar, atualizar e excluir projetos e tarefas, com suporte a autenticação(JWT) e registro de usuários.

## Rodando a aplicação com docker-compose
Para executar o backend + frontend + banco de dados, instale o 
docker [veja como instalar aqui](https://docs.docker.com/engine/install/) e o
docker-compose [veja como instalar aqui](https://docs.docker.com/compose/install/), na pasta raiz do projeto, digite o seguinte comando:
```
$docker-compose up -d
```
Isso é tudo, a primeira vez pode demorar alguns minutos devido ao processo de Download das imagens.
\
Para acessar a aplicação acesse: [http://0.0.0.0:3000/](http://0.0.0.0:3000/)
\
Crie seu usuário clicando no link "Cadastre-se" e efetue o login.

## Rodando a aplicação sem Docker

#### Instale o Node
```
$nvm install 16.10.0
$nvm use 16.10.0
```

### Rodando o backend
Na pasta raiz do projeto digite:
```
$cd backend
$npm install
$npm run start
```
O servidor roda na porta 8000, para verificar se está tudo ok acesse [http://localhost:8000/api/v1/healthcheck](http://localhost:8000/api/v1/healthcheck)

### Rodando o frontend
Na pasta raiz do projeto digite:
```
$cd frontend
$npm run dev
```
O frontend roda na porta 8080, para acessar a aplicação acesse: [http://localhost:8080/](http://localhost:8080/)

### Instalando o banco de dados
O backend usa MongoDB como fonte de dados, para rodar o mongo no seu ambiente local com Docker use:
```
$docker run -d -h mongo --name mongo -p 27017:27017 mongo:6.0-focal
```
Sem Docker [veja como instalar aqui](https://www.mongodb.com/docs/manual/installation/).

Para usar o [Compass GUI](https://www.mongodb.com/products/tools/compass), use a string de conexão:
<b>mongodb://localhost:27017</b>

## Documentação OpenAPI - Swagger
Esse projeto conta com Swagger para documentação de todos os endpoints com seus respectivos parâmetros, requests e responses.
\
\
[Clique aqui acessar o Swagger](http://localhost:8000/api/v1/api-docs).
\
\
![Swagger](Swagger.png)