import * as firestore from "firebase/firestore";
import Category from "../../types/category.types";
import { renderWithRedux } from "../../helpers/test.helpers";
import CategoryDetails from "./category.details.component";

jest.mock("firebase/firestore");

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Category Details", () => {
  it("should fetch and show categories and its products", async () => {
    const mockedFirestore = firestore as any;
    mockedFirestore.getDocs.mockImplementation(async () => ({
      docs: [
        {
          data(): Category {
            return {
              id: "1",
              displayName: "lorem ipsum",
              imageUrl: "image_url",
              name: "lorem ipsum",
              products: [
                { id: "1", price: 10, imageUrl: "image_url", name: "boné" },
              ],
            };
          },
        },
      ],
    }));

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    mockedFirestore.query.mockImplementation(() => ({}));
    mockedFirestore.where.mockImplementation(() => ({}));

    const { findByText, getByText } = renderWithRedux(
      <CategoryDetails categoryId="any_id" />,
      {},
    );

    await findByText("Explorar lorem ipsum");
    getByText("boné");
    getByText("R$10");
  });
});
