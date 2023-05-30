# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o numero de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar o check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar um academia;

## RNs (Regras de negocio)

- [x] O usuário nao deve poder se cadastrar com um email duplicado;
- [x] O usuário nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuário nao pode fazer check-in se nao estiver perto (100m) da academia;
- [x] O check-in so pode ser validado ate 20 minutos apos criado;
- [x] O check-in so pode ser validado por administradores;
- [x] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos nao-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
