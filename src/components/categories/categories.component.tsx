import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

//Components
import CategoryItem from "../category-item/category-item";

// Styles
import { CategoriesContainer, CategoriesContent } from "./categories.style";

// Utilities
import Category from "../../types/category.types";
import { db } from "../../config/firebase.config";
import { categoryConverter } from "../../converters/firestore.converter";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = [];

      const querySnapchot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter),
      );

      querySnapchot.forEach((doc: any) => {
        categoriesFromFirestore.push(doc.data());
      });

      console.log({ categoriesFromFirestore });
      setCategories(categoriesFromFirestore);
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
