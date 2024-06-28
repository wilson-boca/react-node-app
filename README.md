# Aplicativo para controle e execução de Projetos e Tarefas.

Para executar o aplicativo siga os passos abaixo.

## Instalando o Node
```
$nvm install 16.10.0
$nvm use 16.10.0
```
\
Após a instalação do Node no diretório raiz do projeto execute o comando:
```
$npm install
```
\
Isso fará o download das bibliotecas necessárias para a execução do projeto.

## Configurando o banco de dados
O backend usa MongoDB para a gravação de dados, para rodar o mongo no seu ambiente local com Docker use:
```
$docker run -d -h mongo --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -p 27017:27017 mongo:6.0-focal
```
\
Caso queira usar o MongoDB Compass, use essa string de conexão:
\
mongodb://admin:secret@localhost:27017


## Rodando a aplicação
Para executar em um terminal digite o comando:
```
$npm run start
```
\
O servidor roda na porta 8000, para verificar se tudo esta ok acesse [http://localhost:8000/api/v1/healthcheck](http://localhost:8000/api/v1/healthcheck)

