import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../helpers/test.helpers";
import SignUpPage from "./sign.up.page";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Sign Up", () => {
  it("should show error when trying to submit without filling all required fields", async () => {
    const { getByText, findByText } = renderWithRedux(<SignUpPage />, {});

    const submitButton = getByText("Criar sua conta", { selector: "button" });

    userEvent.click(submitButton);

    await findByText(/o nome é obrigatório/i);
    getByText(/o sobrenome é obrigatório/i);
    getByText(/o e-mail é obrigatório/i);
  });

  it("should show error when filling an invalid email", async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {},
    );

    const emailInput = getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "invalid_email");

    const submitButton = getByText("Criar sua conta", { selector: "button" });

    userEvent.click(submitButton);

    await findByText(/insira um e-mail válido/i);
  });
});
