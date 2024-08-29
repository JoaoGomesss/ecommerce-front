import { useContext, useEffect, useState } from "react";

//Components
import CategoryItem from "../category-item/category-item";
import Loading from "../loading/loading.component";

// Styles
import { CategoriesContainer, CategoriesContent } from "./categories.style";

// Utilities
import { CategorieContext } from "../../contexts/categories.context";

const Categories = () => {
  const { categories, isLoading, fetchCategories } =
    useContext(CategorieContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
