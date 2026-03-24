import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Produto = { id: string; nome: string; preco: number };
type CartItem = { produto: Produto; quantidade: number };
type CartContextType = {
  cart: CartItem[];
  addToCart: (produto: Produto) => void;
  total: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((produto: Produto) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find(
        (item) => item.produto.id === produto.id,
      );

      if (itemExistente) {
        return prevCart.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }
      return [...prevCart, { produto, quantidade: 1 }];
    });
  }, []);

  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.produto.preco * item.quantidade,
      0,
    );
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
