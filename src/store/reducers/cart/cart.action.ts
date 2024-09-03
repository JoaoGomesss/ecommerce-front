import Products from "../../../types/products.types";
import CartActionTypes from "./cart.actions.types";

interface ToggleCartAction {
  type: typeof CartActionTypes.toggleCart;
}

export const toggleCart = (): ToggleCartAction => ({ type: "cart/toggle" });

interface AddProductsToCartAction {
  type: typeof CartActionTypes.toggleCart;
  payload: Products;
}

export const addProductToCart = (
  payload: Products,
): AddProductsToCartAction => ({
  type: typeof CartActionTypes.addProductToCart,
  payload,
});

export type CartActions = ToggleCartAction | AddProductsToCartAction;
