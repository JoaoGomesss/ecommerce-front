import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

// Utilities
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converters/firestore.converter";
import Category from "../types/category.types";

interface ICategoryContext {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  isLoading: boolean;
}

interface CategoriesContextProviderProps {
  children: ReactNode;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
  isLoading: false,
});

const CategoryContextProvider: FunctionComponent<
  CategoriesContextProviderProps
> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
