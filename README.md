[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/jOw_Hzd7)

# 🏥 Sistema de Almoxarifado - Enfermagem

## 📋 Sobre o Projeto

Este projeto foi desenvolvido com **React Native** e **Expo** com o objetivo de modernizar o controle de estoque de materiais utilizados no laboratório de enfermagem.

A aplicação permite o cadastro e a visualização de materiais em tempo real através da integração com uma **MockAPI**, facilitando o gerenciamento de insumos e reduzindo erros de controle manual.

---

## 🎯 Objetivos

* Registrar novos materiais no estoque.
* Consultar os materiais cadastrados.
* Atualizar a listagem automaticamente ao iniciar o aplicativo.
* Simular uma aplicação real de controle de almoxarifado utilizando API REST.

---

## 🛠 Tecnologias Utilizadas

* React Native
* Expo
* JavaScript
* MockAPI
* Git e GitHub

---

## 📱 Funcionalidades

### Cadastro de Materiais

O usuário pode informar:

* Nome do material
* Quantidade disponível

Ao clicar no botão **Cadastrar Material**, os dados são enviados para a MockAPI através de uma requisição HTTP POST.

### Listagem de Materiais

Ao abrir o aplicativo, uma requisição HTTP GET é realizada automaticamente utilizando o Hook `useEffect`, carregando todos os materiais cadastrados na API e exibindo-os em uma `FlatList`.

### Indicador de Carregamento

Durante o carregamento das informações, um `ActivityIndicator` é exibido para melhorar a experiência do usuário.

---

## 🔗 API Utilizada

MockAPI utilizada para simulação do banco de dados:

https://6a18c28d23c3626470abfea4.mockapi.io/api/v1/Materiais

---

## 📂 Estrutura da Aplicação

* **TextInput** para cadastro do nome do material.
* **TextInput** para cadastro da quantidade.
* **TouchableOpacity** para envio dos dados.
* **FlatList** para exibição dos materiais cadastrados.
* **useEffect** para carregamento automático dos dados.
* **Fetch API** para comunicação com a MockAPI.

---

## 🚀 Como Executar o Projeto

### Instalar dependências

```bash
npm install
```

### Executar o projeto

```bash
npx expo start
```

ou

```bash
npm start
```

Após iniciar o Expo, utilize um emulador Android, iOS ou o aplicativo Expo Go para visualizar a aplicação.

---

## 👨‍💻 Autor

Layon Augusto

Projeto desenvolvido para a disciplina de Desenvolvimento Mobile.

---

## 🌙 Missão da Noite (2026-06-18)

Criar o módulo de retirada (baixa rápida de estoque) direto na lista de materiais e a opção de exclusão, garantindo por lógica de estado que o sistema impossibilite saídas que resultem em estoque negativo.

Contrato Técnico OBRIGATÓRIO (Para o Autograding)

Utilize as seguintes propriedades em cada linha:

- TextInput interno para informar a quantidade a retirar: testID="input-retirada"
- TouchableOpacity para confirmar a baixa (PUT): testID="btn-baixar"
- TouchableOpacity para deletar o item (DELETE): testID="btn-excluir"
- Função JavaScript Obrigatória: Crie e exporte exatamente uma função pura chamada validarRetirada(estoqueAtual, quantidadeRetirada) que retorne true se a operação for permitida, e false se for inválida (ex: tirar 10 unidades de onde só existem 5).

***

