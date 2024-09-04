import Category from "../../../types/category.types";
import categoriesActionTypes from "./category.action.types";

interface InitialState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: InitialState = {
  categories: [],
  isLoading: false,
};

const categoryReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case categoriesActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };

    case categoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };

    case categoriesActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
