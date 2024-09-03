import Products from "../../../types/products.types";
import CartActionTypes from "./cart.actions.types";

interface ToggleCartAction {
  type: typeof CartActionTypes.toggleCart;
}

export const toggleCart = (): ToggleCartAction => ({
  type: CartActionTypes.toggleCart,
});

interface AddProductsToCartAction {
  type: typeof CartActionTypes.addProductToCart;
  payload: Products;
}

export const addProductToCart = (
  payload: Products,
): AddProductsToCartAction => ({
  type: CartActionTypes.addProductToCart,
  payload,
});
interface removeProductFromCartAction {
  type: typeof CartActionTypes.removeProductFromCart;
  payload: string;
}

export const removeProductFromCart = (
  payload: string,
): removeProductFromCartAction => ({
  type: CartActionTypes.addProductToCart,
  payload,
});

interface increaseCartProductQuantityAction {
  type: typeof CartActionTypes.increaseCartProductQuantity;
  payload: string;
}

export const increaseCartProductQuantity = (
  payload: string,
): increaseCartProductQuantityAction => ({
  type: CartActionTypes.increaseCartProductQuantity,
  payload,
});
interface decreaseCartProductQuantityAction {
  type: typeof CartActionTypes.decreaseCartProductQuantity;
  payload: string;
}

export const decreaseCartProductQuantity = (
  payload: string,
): decreaseCartProductQuantityAction => ({
  type: CartActionTypes.decreaseCartProductQuantity,
  payload,
});
interface clearCartProductAction {
  type: typeof CartActionTypes.clearCartProducts;
}

export const clearCartProducts = (): clearCartProductAction => ({
  type: CartActionTypes.clearCartProducts,
});

export type CartActions =
  | ToggleCartAction
  | AddProductsToCartAction
  | removeProductFromCartAction
  | increaseCartProductQuantityAction
  | decreaseCartProductQuantityAction
  | clearCartProductAction;
