import { Link } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";

export const produtos = [
  { id: "1", nome: "Notebook", preco: 3000 },
  { id: "2", nome: "Mouse", preco: 100 },
  { id: "3", nome: "Teclado", preco: 200 },
];

export default function Home() {
  const { total, cart } = useCart();

  const qtdItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <View style={styles.container}>
      {/* Lista de produtos vem primeiro */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/produto/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.cartHeader}>
        <Text style={styles.cartText}>🛒 Itens: {qtdItens}</Text>
        <Text style={styles.cartText}>Total: R$ {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  cartHeader: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
  },
  cartText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  nome: { fontSize: 18, fontWeight: "bold" },
  preco: { fontSize: 16, color: "green", marginTop: 4 },
});
