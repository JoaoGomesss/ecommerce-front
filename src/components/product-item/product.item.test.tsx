import { renderWithRedux } from "../../helpers/test.helpers";
import Products from "../../types/products.types";
import ProductItem from "./product.item.component";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Product Item", () => {
  it("should show correct product item", () => {
    const productItem: Products = {
      id: "1",
      imageUrl: "image_url",
      name: "boné",
      price: 10,
    };

    const { getByText } = renderWithRedux(
      <ProductItem product={productItem} />,
      {},
    );

    getByText("boné");
    getByText("R$10");
    getByText(/adicionar ao carrinho/i);
  });
});
