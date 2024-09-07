import { renderWithRedux } from "../../helpers/test.helpers";
import CartProduct from "../../types/cart.types";
import CartItem from "./cart.item.component";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Cart Item", () => {
  it("should show correct cart item", () => {
    const cartItem: CartProduct = {
      id: "1",
      imageUrl: "image_url",
      name: "boné",
      price: 10,
      quantity: 1,
    };

    const { getByText, getByLabelText } = renderWithRedux(
      <CartItem product={cartItem} />,
      {},
    );

    getByText(/boné/i);
    getByText("R$10");
    getByText("1");
    getByLabelText(/increase quantity of boné/i);
    getByLabelText(/decrease quantity of boné/i);
    getByLabelText(/remove boné/i);
  });
});
