import { useEffect } from "react";

//Components
import CategoryItem from "../category-item/category-item";
import Loading from "../loading/loading.component";

// Styles
import { CategoriesContainer, CategoriesContent } from "./categories.style";

// Utilities
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { fetchCategories } from "../../store/reducers/category/category.actions";
import { useAppSelector } from "../../hooks/redux.hook";

const Categories = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer,
  );

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories() as any);
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
