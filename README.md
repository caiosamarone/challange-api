# Code Challange Full Stack

Projeto desenvolvido para o desafio técnico da Boticário.

Intitulado "Checkfy", este projeto consiste em um sistema de check-ins em academias.

O sistema possui 3 entidades:

- Usuario
- Academia
- CheckIn

### Usuario

Existem 2 tipos de permissionamentos para usuarios: "ADMIN" e "USER"

O USER é um usuário comum da aplicação, ele deve:

- Se registrar
- Realizar login
- Selecionar uma academia para fazer o check-in

O ADMIN deve:

- Realizar login com usuario e senha fixa (apresentada na sessão de instrucoes de uso)
- Cadastrar e visualizar empresas
- Visualizar e apagar usuários

#### Regras

- Nao é possivel cadastrar um usuário com mesmo email
- Nao é possivel deletar um usuario que fez checkin

Obs: Implementar RBAC para controlar roles e token de autenticação seria inviável por questões de timing.

### Academia

A academia é:

- Criada por um usuario ADMIN
- Recebe Check-Ins por vários usuários da permissão USER

### Check-in

- Feito por um usuário em uma academia especifica

#### Regras

- Nao é possivel um usuário fazer check-in duas vezes no mesmo dia

![Texto Alternativo](https://i.imgur.com/qrla48T.png)

## Stacks

- Fastify
- Typescript
- Zod (Validação de dados)
- Prisma + Postgres

### Controle de Segurança

- ApiKey

### Documentação

- Swagger
- Collection Postman (na raiz do projeto)

## Instruções de Uso

Primeiramente, abra o aplicativo Docker.

Em seguida, entre na raiz do projeto e insira os comandos:

```bash
  npm install
  docker compose up
  npx prisma migrate dev
  npm run start dev
```

A migration irá inserir dados automaticamente na tabela de academias e usuários.

A aplicação vai rodar no endereço http://localhost:3333

Para facilitar o teste, o arquivo .env está no repositório, não sendo necessário alterar o mesmo.

Caso o front-end ainda não esteja rodando, entre no repositório e siga as instruções para subir o ambiente https://github.com/caiosamarone/challange-web

### Teste da API

#### Swagger

Acesse o endereço http://localhost:3333/documentation para acessar o Swagger.
Autentique com a API_KEY que esta no arquivo .env

#### Postman

O arquivo json da collection está na raiz do projeto.
A API_KEY ja está configurada, basta realizar as chamadas.

### Utilizando A aplicação web

Para instruções de regras de interface acesse o repositório frontend:
https://github.com/caiosamarone/challange-web

## Melhorias

- Testes Unitários (A implentação de testes unitários está desenvolvida apenas para o serviço de autenticação de usuário, por questões de timing)

- Testes de Integração

- Implementação de JWT para login de usuários
