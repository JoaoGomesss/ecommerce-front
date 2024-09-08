import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../helpers/test.helpers";
import LoginPage from "./login.page";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Login", () => {
  it("should show erros when trying to submit without filling all required fields", async () => {
    const { getByText, findByText } = renderWithRedux(<LoginPage />, {});

    const submitButton = getByText("Entrar");

    userEvent.click(submitButton);

    await findByText(/o e-mail é obrigatório./i);
    getByText(/a senha é obrigatória./i);
  });
});
