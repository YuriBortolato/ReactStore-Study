import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useCart } from "../../context/CartContext";
import { produtos } from "../index";

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado.</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{produto.nome}</Text>
      <Text style={styles.price}>R$ {produto.preco.toFixed(2)}</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Adicione uma observação (ex: Cor preta)"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar ao Carrinho"
          onPress={() => {
            addToCart(produto);
            router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "green", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: { width: "100%", marginBottom: 20 },
});
