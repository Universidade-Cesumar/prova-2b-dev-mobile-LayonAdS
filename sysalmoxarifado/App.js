import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// importação das bilbiotecas necessárias para o funcionamento do aplicativo

export default function App() {

  const [nome, setNome] = useState('');  // Armazena o nome digitado no formulário
  const [quantidade, setQuantidade] = useState(''); // Armazena a quantidade digitada
  const [materiais, setMateriais] = useState([]); // Armazena a lista de materiais vindos da API
  const [loading, setLoading] = useState(false); // Controla o indicador de carregamento

  // Endereço da MockAPI.
  // Todas as requisições GET e POST serão feitas para esta URL.
  const API_URL = 'https://6a18c28d23c3626470abfea4.mockapi.io/api/v1/Materiais';

  async function carregarMateriais() {
    // Busca todos os materiais cadastrados na MockAPI.
    try {

      // Exibe indicador de carregamento
      setLoading(true);

      // Faz a requisição GET
      const response = await fetch(API_URL);

      // Converte a resposta para JSON
      const data = await response.json();

      // Salva os materiais no estado
      setMateriais(data);

    } catch (error) {

      // Exibe erro no console
      console.log(error);

    } finally {

      // Esconde o indicador de carregamento
      setLoading(false);
    }
  }

  async function cadastrarMaterial() {
    // Envia um novo material para a MockAPI.
    // Verifica se os campos foram preenchidos
    if (!nome || !quantidade) {
      alert('Preencha todos os campos');
      return;
    }

    try {

      // Objeto que será enviado para API
      const novoMaterial = {
        nome,
        quantidade
      };

      // Requisição POST
      await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(novoMaterial)
      });

      // Limpa os campos após cadastrar
      setNome('');
      setQuantidade('');

      // Atualiza a lista
      carregarMateriais();

    } catch (error) {

      console.log(error);
    }
  }

  // Busca os materiais cadastrados na API.
  useEffect(() => {
    carregarMateriais();
  }, []);
  // Executa automaticamente quando a tela é aberta.

return (
  <View style={styles.container}>

    <TextInput
      testID="input-nome"
      placeholder="Nome do Material"
      value={nome}
      onChangeText={setNome}
      style={styles.input}
    />

    <TextInput
      testID="input-quantidade"
      placeholder="Quantidade"
      value={quantidade}
      onChangeText={setQuantidade}
      keyboardType="numeric"
      style={styles.input}
    />

    <TouchableOpacity
      testID="btn-cadastrar"
      onPress={cadastrarMaterial}
      style={styles.button}
    >
      <Text style={styles.buttonText}>
        Cadastrar Material
      </Text>
    </TouchableOpacity>

    <StatusBar style="auto" />

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
