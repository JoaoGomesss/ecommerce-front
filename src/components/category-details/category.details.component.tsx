import { FunctionComponent, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// Utilities
import Category from "../../types/category.types";
import { db } from "../../config/firebase.config";
import { categoryConverter } from "../../converters/firestore.converter";

// Components
import Loading from "../loading/loading.component";
import ProductItem from "../product-item/product.item.component";

// Style
import {
  CategoryTitle,
  Container,
  IconContainer,
  ProductsContainer,
} from "./category.details.style";

interface CategoryDetailsProps {
  categoryId: string;
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  categoryId,
}) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);

        const querySnapchot = await getDocs(
          query(
            collection(db, "categories").withConverter(categoryConverter),
            where("id", "==", categoryId),
          ),
        );

        const category = querySnapchot.docs[0]?.data();

        setCategory(category);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={handleBackClick}>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  );
};

export default CategoryDetails;
