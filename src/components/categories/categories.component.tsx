import { useEffect, useState } from "react";
import axios from "axios";

//Components
import CategoryItem from "../category-item/category-item";
import { CategoriesContainer, CategoriesContent } from "./categories.style";

// Styles
import "./categories.styles.css";

// Utilities
import Category from "../../types/category.types";
import env from "../../config/env.config";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}/api/category`);

      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContainer>
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
