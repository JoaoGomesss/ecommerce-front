import { FunctionComponent, useContext } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";

//Style
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./cart.item.style";

// Utilities
import CartProduct from "../../types/cart.types";
import { CartContext } from "../../contexts/cart.context";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const {
    removeProductFromCart,
    decreaseProductQuantity,
    increaseProductQuantity,
  } = useContext(CartContext);

  const handleRemoveItemClick = () => {
    removeProductFromCart(product.id);
  };
  const handleIncreaseItemClick = () => {
    increaseProductQuantity(product.id);
  };
  const handleDecreaseItemClick = () => {
    decreaseProductQuantity(product.id);
  };

  return (
    <CartItemContainer>
      <CartItemImage $imageUrl={product.imageUrl} />
      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} onClick={handleDecreaseItemClick} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncreaseItemClick} />
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton onClick={handleRemoveItemClick}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
