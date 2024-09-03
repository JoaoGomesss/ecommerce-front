import { FunctionComponent } from "react";
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
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  CartActions,
  decreaseCartProductQuantity,
  increaseCartProductQuantity,
  removeProductFromCart,
} from "../../store/reducers/cart/cart.action";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const dispatch: Dispatch<CartActions> = useDispatch();

  const handleRemoveItemClick = () => {
    dispatch(removeProductFromCart(product.id));
  };
  const handleIncreaseItemClick = () => {
    dispatch(increaseCartProductQuantity(product.id));
  };
  const handleDecreaseItemClick = () => {
    dispatch(decreaseCartProductQuantity(product.id));
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
