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

export type CartActions = ToggleCartAction | AddProductsToCartAction;
