import Header from "./header.component";
import { renderWithRedux } from "../../helpers/test.helpers";
import CartProduct from "../../types/cart.types";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

describe("Header", () => {
  it("should show sign out button if user is authenticated", () => {
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: true } } as any,
    });
    getByText("Sair");
  });

  it("should show sign out button if user is not authenticated", () => {
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: false } } as any,
    });

    getByText("Login");
    getByText("Criar Conta");
  });

  it("should show correct cart products count", () => {
    const products: CartProduct[] = [
      {
        id: "1",
        imageUrl: "image_url",
        name: "Bóne",
        price: 10,
        quantity: 10,
      },
      {
        id: "2",
        imageUrl: "image_url",
        name: "Jaqueta",
        price: 12,
        quantity: 30,
      },
    ];
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: { cartReducer: { products } } as any,
    });

    getByText("40");
  });
});
