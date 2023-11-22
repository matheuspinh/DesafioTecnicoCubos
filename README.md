# Desafio técnico cubos tecnologia backend

## Instalação

- Para instalação das dependências execute no terminal aberto na raiz do projeto o comando.

```sh
npm install
```

- Crie um arquivo `.env` e o popule com as variáveis do arquivo `.env.example`

  NODE_ENV="dev"
  PORT=3333
  DATABASE_URL="postgresql://docker:docker@localhost:5435/desafiocubos"
  JWT_SECRET=
  JWT_EXPIRES_IN="10 m"

  A variável PORT pode ser mudada para uma porta de preferência.

  A variável JWT_SECRET deve ser uma string que será usada como chave secreta para a encriptação dos tokens jwt.

  A variável JWT_EXPIRES_IN representa o tempo de expiração do token, por padrão está configurada para 10 minutos.

  A variável DATABASE_URL está previamente configurada para corresponder às configurações encontradas em docker-compose.yml se preferir modificar as variáveis do docker lembre-se de atualizar a DATABASE_URL.

## Docker

Para executar o docker execute

```sh
docker compose up -d
```

Para parar o container docker execute

```sh
docker compose stop
```

Para remover o container docker execute

```sh
docker compose down
```

## Executando o projeto

Para executar as migrações execute

```sh
npx prisma migrate dev
```

Para executar o projeto execute

```sh
npm run dev
```

## Testes

Para executar os testes no terminal execute

```sh
npm run test
```

Para executar os testes utilizando a interface vitest execute

```sh
npm run test:ui
```
