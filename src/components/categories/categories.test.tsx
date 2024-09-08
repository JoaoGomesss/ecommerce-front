import * as firestore from "firebase/firestore";
import { renderWithRedux } from "../../helpers/test.helpers";
import Categories from "./categories.component";

jest.mock("firebase/firestore");

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Categories", () => {
  it("should fecth and show categories", async () => {
    const mockedFirestore = firestore as any;
    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data() {
          return {
            id: "1",
            displayName: "lorem ipsum",
          };
        },
      },
    ]);

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    const { getByText, findByText } = renderWithRedux(<Categories />, {});

    await findByText("lorem ipsum");
    getByText(/explorar/i);
  });
});
