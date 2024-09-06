import Header from "./header.component";
import { renderWithRedux } from "../../helpers/test.helpers";

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
});
