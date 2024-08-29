import { FunctionComponent } from "react";

// Style
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from "./product.item.syle";

//utilities
import Products from "../../types/products.types";

interface ProducItemProps {
  product: Products;
}

const ProductItem: FunctionComponent<ProducItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}></ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
