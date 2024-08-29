import { FunctionComponent, useContext, useEffect } from "react";

// Styles
import { Container } from "./categories.overview.style";

// Utilities
import { CategoryContext } from "../../contexts/categories.context";

// Components
import CategoryOverview from "../category-overview/category.overview.component";

const CategoriesOverview: FunctionComponent = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
