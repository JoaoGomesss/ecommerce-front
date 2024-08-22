import { useEffect, useState } from "react";
import axios from "axios";

// Utilities
import Category from "../../types/category.types";

// Styles
import "./categories.styles.css";
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
    <div className="categories-container">
      <div className="categories-content"></div>
    </div>
  );
};

export default Categories;
