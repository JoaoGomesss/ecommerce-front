import { FunctionComponent, useContext, useState } from "react";
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
import axios from "axios";
import Loading from "../loading/loading.component";

const CheckOut: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL!}/create-checkout-session`,
        {
          products,
        },
      );
      window.location.href = data.url;

      console.log(data.url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      {isLoading && <Loading />}
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </CheckoutProducts>
          <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>
          <CustomButton
            startIcon={<BsBagCheck />}
            onClick={handleFinishPurchaseClick}
          >
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