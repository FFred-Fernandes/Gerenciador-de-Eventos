# Gerenciador de Eventos

* Este projeto é uma aplicação fullstack que permite aos administradores gerenciar eventos de maneira simples e eficiente. Ele foi desenvolvido utilizando React para o frontend e Spring Boot para o backend.

## Funcionalidades

### Frontend (React e React Native):

1. Tela de Login:
   - Campos: Email do Administrador e Senha;
   - Opção "Gravar Senha" para acesso rápido nas próximas visitas;
   - Botões: "Entrar" e "Cadastrar-se".

2. Tela de Cadastro de Administrador:
   - Campos: Nome do Administrador, Email, Senha, Confirmar Senha;
   - Validação para garantir que as senhas coincidem;
   - Exibição de mensagem de sucesso ao cadastrar.

3. Tela Home de Eventos:
   - Exibe uma lista de eventos cadastrados pelo administrador, com imagem, título, data e localização;
   - Opções para editar a data e a localização dos eventos;
   - Opção para excluir eventos;
   - Botão para adicionar novos eventos, que abre uma modal com os seguintes campos: (Nome do evento, Data, Localização e Imagem).

### Backend (Spring Boot):

1. Serviço de Login de Administrador:
   - Realiza o login usando email e senha.

2. Serviço de Cadastro de Administrador:
   - Recebe os dados de nome, email e senha para criar um novo administrador no sistema.

3. Serviço de Cadastro de Evento:
   - Recebe as informações do evento (nome, data, localização e imagem).

4. Serviço de Atualização de Evento:
   - Permite a atualização de dados como data ou localização de um evento específico utilizando o eventoId.

5. Serviço de Exclusão de Evento:
   - Exclui um evento com base no seu eventoId.

## Tecnologias Utilizadas

* [React](https://react.dev/);
* [React Native](https://reactnative.dev/)
* [Spring](https://spring.io/tools);
* [DBevear](https://dbeaver.io/);
* [Swagger](https://swagger.io/).

## Autor

* [Frederico da Costa Fernandes](https://github.com/FFred-Fernandes)
