import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category from "../../../types/category.types";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import { categoryConverter } from "../../../converters/firestore.converter";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const categoriesFromFirestore: Category[] = [];

    const querySnapchot = await getDocs(
      collection(db, "categories").withConverter(categoryConverter),
    );

    querySnapchot.forEach((doc: any) => {
      categoriesFromFirestore.push(doc.data());
    });

    return categoriesFromFirestore;
  },
);

interface InitialState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: InitialState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
