import { renderWithRedux } from "../../helpers/test.helpers";
import CheckOut from "./checkout.component";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Checkout", () => {
  it("should show correct products and total price", () => {
    const { getByText } = renderWithRedux(<CheckOut />, {
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
            {
              id: "1",
              imageUrl: "image_url",
              name: "Boné",
              price: 10,
              quantity: 2,
            },
          ],
        },
      },
    } as any);

    getByText("Total: R$40");
    getByText(/finalizar compra/i);
    getByText(/checkout/i);
  });

  it("should show empty message if cart is empty and not show checkout button", () => {
    const { getByText, queryByText } = renderWithRedux(<CheckOut />, {
      preloadedState: {
        cartReducer: {
          products: [],
        },
      },
    } as any);

    getByText(/seu carrinho está vázio/i);
    expect(queryByText(/finalizar compra/i)).toBeNull();
  });
});
