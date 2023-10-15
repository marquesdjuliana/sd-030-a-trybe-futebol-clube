
**Olá, olá!** Bem-vinda(o) ao repositório do projeto **Trybe Futebol Clube - TFC** !

Este projeto fez parte das avaliações do módulo de Backend da Trybe. 
O TFC é um projeto focado no desenvolvimento do back-end e na integração de APIs. Seu principal objetivo foi criar um back-end dockerizado usando modelagem de dados através do Sequelize. Isso possibilitou que o front-end consuma os dados de um banco de dados para exibição.

## Funcionalidades

- Desenvolvimento do back-end dockerizado.
- Integração com um banco de dados MySQL.
- Criação de rotas para consumir dados pelo front-end.

## Instalação
Se deseja experimentar o projeto em sua máquina local, siga estas etapas:

1. Clone o repositório:
```sh
git clone git@github.com:marquesdjuliana/trybe_futebol_clube.git
```
2. Entre na pasta do repositório:
```sh
cd trybe_futebol_clube 
```
3. Executando com Docker:
Use o Docker Compose para executar o serviço Node.js. Certifique-se de estar no diretório raiz do projeto, onde o arquivo `docker-compose.yml` está localizado.
```sh
docker-compose up -d
```
4. Acessando o Container:

Depois de iniciar o contêiner, você pode acessá-lo via linha de comando ou por meio do Visual Studio Code. Use o seguinte comando para acessar o terminal interativo do contêiner:
```sh
docker exec -it trybe_futebol_clube bash
```
5. Instalando Dependências:
   
Cada diretório (frontend e backend) possui suas próprias dependências - você pode instalá-las de forma rápida rodando o comando:
```sh
npm run install:apps
```
<br>


Sinta-se à vontade para explorar este projeto, acompanhar meu crescimento e contribuir, se desejar. Se você tiver alguma sugestão, feedback ou quiser trocar conhecimentos, será um prazer conectar com você no LinkedIn!


