import { renderWithRedux } from "../../helpers/test.helpers";
import Cart from "./cart.components";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Cart", () => {
  it("should show correct cart products", () => {
    const { getByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: "1",
              imageUrl: "image_url",
              name: "Boné",
              price: 10,
              quantity: 2,
            },
          ],
        },
      } as any,
    });

    getByText(/boné/i);
    getByText("R$10");
    getByText("2");
    getByText("Total: R$20");
  });
});
