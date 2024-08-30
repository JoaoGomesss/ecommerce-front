import { createContext, FunctionComponent, ReactNode, useState } from "react";

// Utilities
import CartProduct from "../types/cart.types";
import Products from "../types/products.types";

interface ICartContext {
  isVisible: boolean;
  toggleCart: () => void;
  addProductToCart: (product: Products) => void;
  products: CartProduct[];
}

interface ICartContextProps {
  children: ReactNode;
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  toggleCart: () => {},
  addProductToCart: () => {},
  products: [],
});

const CartContextProvider: FunctionComponent<ICartContextProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Products) => {
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  return (
    <CartContext.Provider
      value={{ isVisible, products, toggleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
