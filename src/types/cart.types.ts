import Products from "./products.types";

interface CartProduct extends Products {
  quantity: number;
}

export default CartProduct;
