import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// importação das bibliotecas necessárias para o funcionamento do aplicativo

// Função obrigatória para validar a retirada de estoque
export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  return (
    quantidadeRetirada > 0 &&
    quantidadeRetirada <= estoqueAtual
  );
}

export default function App() {

  const [nome, setNome] = useState('');  // Armazena o nome digitado no formulário
  const [quantidade, setQuantidade] = useState(''); // Armazena a quantidade digitada
  const [materiais, setMateriais] = useState([]); // Armazena a lista de materiais vindos da API
  const [loading, setLoading] = useState(false); // Controla o indicador de carregamento
  const [retiradas, setRetiradas] = useState({}); // Armazena as quantidades a serem retiradas para cada material
  const [busca, setBusca] = useState(''); // Armazena o texto digitado na pesquisa

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

      // Exibe erro no console e alerta amigável
      console.log(error);
      alert('Erro de conexão. Tente novamente.');

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
      alert('Erro de conexão. Tente novamente.');
    }
  }

  async function excluirMaterial(id) {
    try {

      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      carregarMateriais();

    } catch (error) {
      console.log(error);
      alert('Erro de conexão. Tente novamente.');
    }
  }

  async function baixarEstoque(item) {

    const quantidadeRetirada =
      Number(retiradas[item.id] || 0);

    const estoqueAtual =
      Number(item.quantidade);

    if (
      !validarRetirada(
        estoqueAtual,
        quantidadeRetirada
      )
    ) {
      alert('Quantidade inválida!');
      return;
    }

    const novoEstoque =
      estoqueAtual - quantidadeRetirada;

    try {

      await fetch(`${API_URL}/${item.id}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          nome: item.nome,
          quantidade: novoEstoque
        })
      });

      carregarMateriais();
      setRetiradas({
        ...retiradas,
        [item.id]: ''
      });

    } catch (error) {
      console.log(error);
      alert('Erro de conexão. Tente novamente.');
    }
  }

  // Busca os materiais cadastrados na API.
  useEffect(() => {
    carregarMateriais();
  }, []);
  // Executa automaticamente quando a tela é aberta.

  const materiaisFiltrados = materiais.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

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

      <TextInput
        testID="input-busca"
        placeholder="Pesquisar material..."
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <Text
        testID="total-itens"
        style={styles.total}
      >
        Total de materiais: {materiaisFiltrados.length}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          

          <FlatList
            testID="lista-materiais"
            data={materiaisFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.card,
                  Number(item.quantidade) < 10 && styles.cardCritico,
                ]}
                accessibilityLabel={
                  Number(item.quantidade) < 10
                    ? 'estoque-critico'
                    : undefined
                }
              >

                <Text style={styles.itemTitle}>
                  {item.nome}
                </Text>

                <Text>
                  Quantidade: {item.quantidade}
                </Text>

                <TextInput
                  testID="input-retirada"
                  placeholder="Quantidade para retirada"
                  keyboardType="numeric"
                  style={styles.input}
                  value={retiradas[item.id] || ''}
                  onChangeText={(texto) =>
                    setRetiradas({
                      ...retiradas,
                      [item.id]: texto
                    })
                  }
                />
                <TouchableOpacity
                  testID="btn-baixar"
                  style={styles.button}
                  onPress={() => baixarEstoque(item)}
                >
                  <Text style={styles.buttonText}>
                    Baixar Estoque
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn-excluir"
                  style={styles.deleteButton}
                  onPress={() => excluirMaterial(item.id)}
                >
                  <Text style={styles.buttonText}>
                    Excluir Material
                  </Text>
                </TouchableOpacity>

              </View>
            )}
          />
          <StatusBar style="auto" />
        </>
      )}

        </View>
      );
}

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F6F8FF',
          paddingTop: 60,
          paddingHorizontal: 18,
        },

        header: {
          backgroundColor: '#0B63D6',
          padding: 14,
          borderRadius: 10,
          marginBottom: 14,
        },

        title: {
          fontSize: 20,
          fontWeight: '700',
          color: '#ffffff',
          textAlign: 'center',
        },

        description: {
          fontSize: 14,
          color: '#556070',
          textAlign: 'center',
          lineHeight: 20,
          marginBottom: 18,
        },

        input: {
          borderWidth: 1,
          borderColor: '#E6EAF0',
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          padding: 12,
          marginBottom: 10,
        },

        button: {
          backgroundColor: '#0B63D6',
          padding: 14,
          borderRadius: 10,
          marginBottom: 12,
          alignItems: 'center',
        },

        buttonText: {
          color: '#fff',
          textAlign: 'center',
          fontWeight: '700',
        },

        card: {
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          padding: 14,
          marginBottom: 12,
          width: '100%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 3,
        },

        itemTitle: {
          fontWeight: '700',
          fontSize: 16,
          marginBottom: 6,
          color: '#222',
        },

        total: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 15,
          color: '#1D2939',
        },

        cardCritico: {
          backgroundColor: '#ffd6d6',
          borderColor: 'red',
          borderWidth: 2,
        },

        deleteButton: {
          backgroundColor: '#DC3545',
          padding: 12,
          borderRadius: 10,
          marginTop: 8,
          alignItems: 'center',
        },

      });
