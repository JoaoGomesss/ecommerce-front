import { FunctionComponent } from "react";
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
import { useAppSelector } from "../../hooks/redux.hook";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { CartActions, toggleCart } from "../../store/reducers/cart/cart.action";
import {
  selectProductsCount,
  selectProductsTotalPrice,
} from "../../store/reducers/cart/cart.selector";

const Cart: FunctionComponent = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer);

  const dispatch: Dispatch<CartActions> = useDispatch();

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);
  const productsCount = useAppSelector(selectProductsCount);

  const navigate = useNavigate();

  const handleGoToCheckoutPage = () => {
    navigate("/checkout");
    dispatch(toggleCart());
  };

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart());
  };

  return (
    <CartContainer $isVisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
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
