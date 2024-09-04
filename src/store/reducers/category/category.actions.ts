import { getDocs, collection } from "firebase/firestore";
import { Dispatch } from "redux";

import { db } from "../../../config/firebase.config";
import { categoryConverter } from "../../../converters/firestore.converter";
import Category from "../../../types/category.types";
import categoriesActionTypes from "./category.action.types";

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: categoriesActionTypes.FETCH_CATEGORIES_START });

    try {
      const categoriesFromFirestore: Category[] = [];

      const querySnapchot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter),
      );

      querySnapchot.forEach((doc: any) => {
        categoriesFromFirestore.push(doc.data());
      });

      dispatch({
        type: categoriesActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesFromFirestore,
      });
    } catch (error) {
      dispatch({ type: categoriesActionTypes.FETCH_CATEGORIES_FAILURE });
    }
  };
};
