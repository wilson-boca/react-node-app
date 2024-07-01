# TaskFlow v1.0.0

### Aplicação para gerenciamento de projetos e tarefas com backend em NodeJS e frontend em ReactJS. Permite criar, listar, atualizar e excluir projetos e tarefas, com suporte a autenticação(JWT) e registro de usuários.

## Rodando a aplicação com docker-compose
Para executar o backend + frontend + banco de dados, instale o docker-compose [veja como instalar aqui](https://docs.docker.com/compose/install/), na pasta raiz do projeto, digite o seguinte comando:
```
$docker-compose up -d
```
Isso é tudo, a primeira vezx pode demorar um pouco devido ao processo de Download das imagens, nas demais vezes é pra ser bem rápido pra subir.


## Rodando o backend sem Docker

Instale o Node
```
$nvm install 16.10.0
$nvm use 16.10.0
```

## Configurando o banco de dados
O backend usa MongoDB para a gravação de dados, para rodar o mongo no seu ambiente local com Docker use:
```
$docker run -d -h mongo --name mongo -p 27017:27017 mongo:6.0-focal
```
Caso queira usar o MongoDB Compass, use essa string de conexão:
<b>mongodb://localhost:27017</b>


## Executando o backend
Na pasta raiz do projeto digite:
```
$cd backend
$npm install
$npm run start
```
O servidor roda na porta 8000, para verificar se tudo esta ok acesse [http://localhost:8000/api/v1/healthcheck](http://localhost:8000/api/v1/healthcheck)

Acesse a aplicação(frontend) nesse endereço <b>[http://0.0.0.0:3000](http://0.0.0.0:3000)</b>

## Documentação OpenAPI - Swagger
Esse projeto conta com Swagger para documentação de todos os endpoints com seus respectivos parâmetros, requests e responses.
\
\
[Clique aqui acessar o Swagger](http://localhost:8000/api/v1/api-docs), 
você verá uma tela conforme abaixo.
\
\
![Swagger](Swagger.png)