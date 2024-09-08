import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../helpers/test.helpers";
import LoginPage from "./login.page";
import * as firebaseAuth from "firebase/auth";
import { AuthErrorCodes } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  AuthErrorCodes: {
    INVALID_PASSWORD: "auth/wrong-password",
    USER_DELETED: "auth/user-not-found",
  },
}));

describe("Login", () => {
  it("should show erros when trying to submit without filling all required fields", async () => {
    const { getByText, findByText } = renderWithRedux(<LoginPage />, {});

    const submitButton = getByText("Entrar");

    userEvent.click(submitButton);

    await findByText(/o e-mail é obrigatório./i);
    getByText(/a senha é obrigatória./i);
  });

  it("should show error if email is invalid", async () => {
    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(
      <LoginPage />,
      {},
    );

    const emailInput = getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "invalid_email");

    const submitButton = getByText("Entrar");

    userEvent.click(submitButton);

    await findByText(/insira um e-mail válido!/i);
  });

  it("should show an error if email is not found", async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.USER_DELETED }),
    );

    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(
      <LoginPage />,
      {},
    );

    const emailInput = getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "lorem@ipsum.com");

    const passwordIput = getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordIput, "234566");

    const submitButton = getByText("Entrar");

    userEvent.click(submitButton);

    await findByText(/não existe um usuário com esse email/i);
  });

  it("should show an error if password is not found", async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.INVALID_PASSWORD }),
    );

    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(
      <LoginPage />,
      {},
    );

    const emailInput = getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "lorem@ipsum.com");

    const passwordIput = getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordIput, "123456");

    const submitButton = getByText("Entrar");

    userEvent.click(submitButton);

    await findByText(/senha inválida/i);
  });
});
