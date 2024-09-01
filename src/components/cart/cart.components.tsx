import { FunctionComponent, useContext } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Style
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from "./cart.style";

// Component
import CustomButton from "../custom-button/custom.button.component";
import CartItem from "../cart-item/cart.item.component";

// Utilities
import { CartContext } from "../../contexts/cart.context";

const Cart: FunctionComponent = () => {
  const { isVisible, products, toggleCart, productsTotalPrice, productsCount } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleGoToCheckoutPage = () => {
    navigate("/checkout");
    toggleCart();
  };

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}
        {productsCount > 0 && (
          <CustomButton
            onClick={handleGoToCheckoutPage}
            startIcon={<BsCartCheck />}
          >
            Ir para o Check Out
          </CustomButton>
        )}
        {productsCount === 0 && <p>Seu carrinho está vázio!</p>}
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
