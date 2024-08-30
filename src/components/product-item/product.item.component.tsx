import { FunctionComponent, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";

// Style
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from "./product.item.syle";

// Components
import CustomButton from "../custom-button/custom.button.component";

//Utilities
import Products from "../../types/products.types";
import { CartContext } from "../../contexts/cart.context";

interface ProducItemProps {
  product: Products;
}

const ProductItem: FunctionComponent<ProducItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const handleAddItemToCartClick = () => {
    addProductToCart(product);
  };

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton
          startIcon={<BsCartPlus />}
          onClick={handleAddItemToCartClick}
        >
          Adicionar ao Carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
