import { render } from "@testing-library/react";
import CategoryItem from "./category-item";
import Category from "../../types/category.types";
import { BrowserRouter } from "react-router-dom";

describe("Category Item", () => {
  it("should render category correctly ", () => {
    const category: Category = {
      id: "1",
      displayName: "lorem ipsum",
      imageUrl: "image_url",
      name: "lorem-ipsum",
      products: [],
    };

    const { getByText } = render(
      <BrowserRouter>
        <CategoryItem category={category} />
      </BrowserRouter>,
    );

    getByText("lorem ipsum");
    getByText("Explorar");
  });
});
