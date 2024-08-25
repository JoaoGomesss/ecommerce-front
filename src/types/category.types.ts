import Products from "./products.types";

interface Category {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  products: Products[];
}

export default Category;
