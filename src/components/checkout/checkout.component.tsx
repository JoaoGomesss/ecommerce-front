import { FunctionComponent, useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { BsBagCheck } from "react-icons/bs";

// Style
import {
  CheckoutContainer,
  CheckoutTitle,
  CheckoutProducts,
  CheckoutTotal,
} from "./checkout.style";

// Components
import CustomButton from "../custom-button/custom.button.component";
import CartItem from "../cart-item/cart.item.component";

const CheckOut: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </CheckoutProducts>
          <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>
          <CustomButton startIcon={<BsBagCheck />}>
            Finalizar Compra
          </CustomButton>
        </>
      ) : (
        <p style={{ paddingTop: "100px", font: "bold", fontSize: "50px" }}>
          Seu carrinho está vázio :(
        </p>
      )}
    </CheckoutContainer>
  );
};

export default CheckOut;
