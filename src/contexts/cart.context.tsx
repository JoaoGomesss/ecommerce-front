import { createContext, FunctionComponent, ReactNode, useState } from "react";
import CartProduct from "../types/cart.types";

interface ICartContext {
  isVisible: boolean;
  toggleCart: () => void;
  products: CartProduct[];
}

interface ICartContextProps {
  children: ReactNode;
}

const CartContext = createContext<ICartContext>({
  isVisible: false,
  toggleCart: () => {},
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
  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
