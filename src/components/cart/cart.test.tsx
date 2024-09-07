import userEvent from "@testing-library/user-event";
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
    getByText(/ir para o check out/i);
  });

  it("should not show checkout message and should show an empty message if cart is empty", () => {
    const { getByText, queryByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [],
        },
      } as any,
    });

    getByText(/seu carrinho está vázio!/i);
    expect(queryByText(/ir para o check out/i)).toBeNull();
  });

  it("should increase product quantity on increase click", () => {
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
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

    const increaseButton = getByLabelText(/increase quantity of boné/i);

    userEvent.click(increaseButton);
    getByText("3");
    getByText("Total: R$30");
  });
  it("should decrease product quantity on increase click", () => {
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
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

    const decreaseButton = getByLabelText(/decrease quantity of boné/i);

    userEvent.click(decreaseButton);
    getByText("1");
    getByText("Total: R$10");
  });

  it("should remove product on remove click", () => {
    const { getByLabelText, queryByText, getByText } = renderWithRedux(
      <Cart />,
      {
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
      },
    );

    const removeButton = getByLabelText(/remove boné/i);

    userEvent.click(removeButton);
    expect(queryByText(/boné/i)).toBeNull();
    getByText(/seu carrinho está vázio/i);
  });
});
