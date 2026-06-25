# 🏥 Sistema de Almoxarifado - Enfermagem

## 📋 Sobre o Projeto

Este projeto é um aplicativo de controle de estoque desenvolvido com **React Native** e **Expo**. Ele foi criado para tornar o gerenciamento de materiais mais prático e seguro, com cadastro, busca em tempo real, indicadores visuais de estoque crítico e tratamento de erros de rede.

---

## 🎯 Objetivo

Permitir o cadastro de materiais, visualização da quantidade disponível, baixa de estoque e exclusão de itens. O app também exibe apenas os materiais filtrados pela pesquisa e sinaliza visualmente quando o estoque está crítico.

---

## 🛠 Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- MockAPI
- Git e GitHub

---

## 🚀 Funcionalidades

- Cadastro de material com nome e quantidade
- Listagem automática de materiais ao abrir o app
- Pesquisa em tempo real com `TextInput` usando `testID="input-busca"`
- Totalizador dinâmico com `Text` usando `testID="total-itens"`
- Indicador visual de estoque crítico para materiais com quantidade menor que 10
- Tratamento de erros de rede com mensagens amigáveis ao usuário
- Baixa de estoque e exclusão de materiais

---

## 🔎 Controles Importantes

- `input-nome`: campo para nome do material
- `input-quantidade`: campo para quantidade do material
- `btn-cadastrar`: botão para cadastrar material
- `input-busca`: campo de busca em tempo real
- `total-itens`: totalizador dos materiais exibidos
- `lista-materiais`: lista de materiais filtrados
- `input-retirada`: campo para informar quantidade de baixa
- `btn-baixar`: botão para baixar estoque
- `btn-excluir`: botão para excluir material
- `estoque-critico`: `accessibilityLabel` aplicado ao card com estoque crítico

---

## 📱 Capturas de Tela

Insira abaixo as capturas de tela do aplicativo funcionando. Se possível, salve as imagens em uma pasta `screenshots/` e adicione os links aqui:

- `screenshots/1-app-lista.png`
- `screenshots/2-app-pesquisa.png`
- `screenshots/3-app-estoque-critico.png`

---

## 🧪 Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o Expo

```bash
npx expo start
```

ou

```bash
npm start
```

### 3. Abrir no dispositivo

Use um emulador Android, iOS ou o aplicativo Expo Go para abrir o projeto.

---

## 📄 API Utilizada

MockAPI utilizada para simulação do banco de dados:

https://6a18c28d23c3626470abfea4.mockapi.io/api/v1/Materiais

---

## 👨‍💻 Autor

Layon Augusto

Projeto desenvolvido para a disciplina de Desenvolvimento Mobile.

---

## 📌 Observações de Avaliação

- O filtro está em tempo real e atualiza a lista de materiais.
- O totalizador exibe a quantidade de itens visíveis após a busca.
- O componente de estoque crítico aplica estilo visual e acessibilidade quando a quantidade é menor que 10.
- As requisições de rede usam `try/catch` e exibem alertas amigáveis para falhas.


***

